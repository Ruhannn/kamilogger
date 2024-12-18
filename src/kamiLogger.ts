/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose, { Schema } from "mongoose";
import morgan from "morgan";
import { PassThrough } from "stream";
import { cyan, gray, red, greenBright, yellow, yellowBright, bold, isColorSupported } from 'colorette';
// @ts-expect-error
import { carry } from "carrier";
import { D } from "./type";
const passStream = new PassThrough();
let logSchema: Schema;

/**
 * kamiLogger.
 * 
 */
export function kamiLogger(config: D['config'] = {}) {


    if (config?.connectionString && mongoose.connections[0].readyState === 0) {
        mongoose.connect(config.connectionString, {
            user: config.user,
            pass: config.pass,
            dbName: config.dbName,
        }).catch((err) => {
            throw (`kami error :${err}`);
        });
    }


    // Create stream to read from
    const lineStream = carry(passStream);
    lineStream.on("line", onLine);

    // Schema - only once created.
    if (!logSchema) {
        logSchema = new Schema(
            {
                log: Object,
            },
            config.capped
                ? {
                    capped: {
                        size: config.capped.cappedSize ?? 10000000,
                        max: config.capped.cappedMax,
                    },
                }
                : { versionKey: false },
        );
    }

    // Create mongoose model
    const Log = mongoose.model("Log", logSchema, config.collection ?? "logs");

    async function onLine(line: string): Promise<void> {
        const parsedLog: string[] = Object.values<string>(JSON.parse(line));

        const formattedLog = parsedLog.map((value, i: number) => {
            // method
            if (i === 0) {
                return value === "GET"
                    ? greenBright(value)
                    : value === "POST"
                        ? yellowBright(value)
                        : value === "PUT"
                            ? yellow(value)
                            : value === "PATCH"
                                ? yellow(value)
                                : value === "DELETE"
                                    ? red(value)
                                    : (value)
            }
            // status code is number
            else if (i === 1) {
                return value
            }
            // url
            else if (i === 2) {
                return gray(value);
            }  // response-time
            else if (i === 3) {
                return (`took ${cyan(value)}`);
            } // ip 
            else if (i === 4) {
                return "from"
            }// ref
            else if (i === 5) {
                return bold(value)
            } // user agent
            else if (i === 6) {
                const match = value.match(/(Firefox|Chrome|Safari|Opera|Edge)/);
                return match ? (`in ${bold(match[0])}`) : null
            }
            // time
            else if (i === 7) {
                return ""
            }
            return String(value);
        }).join(' ');

        console.log(isColorSupported ? formattedLog : Object.values(parsedLog).join(' '));

        const logModel = new Log({ log: line });
        try {
            if (config?.connectionString) {
                await logModel.save();
            }
        } catch (err) {
            if (err) {
                throw err;
            }
        }

    }




    const Morgan = morgan((tokens, req, res) => {
        return JSON.stringify({
            method: tokens.method(req, res),
            status: tokens.status(req, res),
            url: tokens.url(req, res),
            execTime: tokens['response-time'](req, res) + 'ms',
            ip: tokens[':remote-addr'](req, res),
            referer: tokens.referrer(req, res),
            userAgent: tokens['user-agent'](req, res),
            time: tokens.date(req, res, 'iso'),
        });
    }, {
        stream: passStream
    });

    return Morgan;
}