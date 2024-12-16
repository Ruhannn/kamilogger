export type D = {
    /**
     * Configuration options for the kamiLogger.
     */
    config?: {
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
        /**
         * The user for database authentication (optional).
         */
        user?: string;
        /**
         * The password for database authentication (optional).
         */
        pass?: string;
        /**
         * The name of the database (optional).
         */
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
