export type D = {
    /**
     * Configuration options for the kamiLogger.
     */
    config?: {
        isMongoose?: boolean,
        /**
         * The connection string for the database.
         */
        connectionString?: string;
        /**
         * Collection name, default is `logs`.
         */
        collection?: string;
        /**
         * Settings for capped collections.
         */
        capped?: {
            /**
             * The maximum size of the capped collection.
             */
            cappedSize?: number;
            /**
             * The maximum number of logs.
             */
            cappedMax?: number;
        };
        dbName?: string;
        /**
         * The format for logging. Possible values are:
         * - "dev" - Development log format
         * - "combined" - Detailed log format
         * - "common" - Standard log format
         * - "short" - Short log format
         * - "tiny" - Very short log format
         * - Default is `combined`
         */
        format?: "dev" | "combined" | "common" | "short" | "tiny";
    }
};