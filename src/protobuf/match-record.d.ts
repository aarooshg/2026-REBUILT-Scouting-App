import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace troyargonautsprotobuf. */
export namespace troyargonautsprotobuf {

    /** ClimbLevel enum. */
    enum ClimbLevel {
        CLIMB_NONE = 0,
        LEVEL_1 = 1,
        LEVEL_2 = 2,
        LEVEL_3 = 3
    }

    /** Properties of a MatchRecord. */
    interface IMatchRecord {

        /** MatchRecord id */
        id?: (string|null);

        /** MatchRecord team */
        team?: (string|null);

        /** MatchRecord match */
        match?: (string|null);

        /** MatchRecord scouter */
        scouter?: (string|null);

        /** MatchRecord autonShotsAttempted */
        autonShotsAttempted?: (number|null);

        /** MatchRecord autonShotsMade */
        autonShotsMade?: (number|null);

        /** MatchRecord teleopShotsAttempted */
        teleopShotsAttempted?: (number|null);

        /** MatchRecord teleopShotsMade */
        teleopShotsMade?: (number|null);

        /** MatchRecord climbLevel */
        climbLevel?: (troyargonautsprotobuf.ClimbLevel|null);

        /** MatchRecord canGoOverBump */
        canGoOverBump?: (boolean|null);

        /** MatchRecord canGoUnderTrench */
        canGoUnderTrench?: (boolean|null);

        /** MatchRecord canClimbLevel1Auton */
        canClimbLevel1Auton?: (boolean|null);

        /** MatchRecord notes */
        notes?: (string|null);
    }

    /** Represents a MatchRecord. */
    class MatchRecord implements IMatchRecord {

        /**
         * Constructs a new MatchRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: troyargonautsprotobuf.IMatchRecord);

        /** MatchRecord id. */
        public id: string;

        /** MatchRecord team. */
        public team: string;

        /** MatchRecord match. */
        public match: string;

        /** MatchRecord scouter. */
        public scouter: string;

        /** MatchRecord autonShotsAttempted. */
        public autonShotsAttempted: number;

        /** MatchRecord autonShotsMade. */
        public autonShotsMade: number;

        /** MatchRecord teleopShotsAttempted. */
        public teleopShotsAttempted: number;

        /** MatchRecord teleopShotsMade. */
        public teleopShotsMade: number;

        /** MatchRecord climbLevel. */
        public climbLevel: troyargonautsprotobuf.ClimbLevel;

        /** MatchRecord canGoOverBump. */
        public canGoOverBump: boolean;

        /** MatchRecord canGoUnderTrench. */
        public canGoUnderTrench: boolean;

        /** MatchRecord canClimbLevel1Auton. */
        public canClimbLevel1Auton: boolean;

        /** MatchRecord notes. */
        public notes: string;

        /**
         * Creates a new MatchRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchRecord instance
         */
        public static create(properties?: troyargonautsprotobuf.IMatchRecord): troyargonautsprotobuf.MatchRecord;

        /**
         * Encodes the specified MatchRecord message. Does not implicitly {@link troyargonautsprotobuf.MatchRecord.verify|verify} messages.
         * @param message MatchRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: troyargonautsprotobuf.IMatchRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchRecord message, length delimited. Does not implicitly {@link troyargonautsprotobuf.MatchRecord.verify|verify} messages.
         * @param message MatchRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: troyargonautsprotobuf.IMatchRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): troyargonautsprotobuf.MatchRecord;

        /**
         * Decodes a MatchRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): troyargonautsprotobuf.MatchRecord;

        /**
         * Verifies a MatchRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchRecord
         */
        public static fromObject(object: { [k: string]: any }): troyargonautsprotobuf.MatchRecord;

        /**
         * Creates a plain object from a MatchRecord message. Also converts values to other types if specified.
         * @param message MatchRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: troyargonautsprotobuf.MatchRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchRecord
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchRecords. */
    interface IMatchRecords {

        /** MatchRecords records */
        records?: (troyargonautsprotobuf.IMatchRecord[]|null);
    }

    /** Represents a MatchRecords. */
    class MatchRecords implements IMatchRecords {

        /**
         * Constructs a new MatchRecords.
         * @param [properties] Properties to set
         */
        constructor(properties?: troyargonautsprotobuf.IMatchRecords);

        /** MatchRecords records. */
        public records: troyargonautsprotobuf.IMatchRecord[];

        /**
         * Creates a new MatchRecords instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchRecords instance
         */
        public static create(properties?: troyargonautsprotobuf.IMatchRecords): troyargonautsprotobuf.MatchRecords;

        /**
         * Encodes the specified MatchRecords message. Does not implicitly {@link troyargonautsprotobuf.MatchRecords.verify|verify} messages.
         * @param message MatchRecords message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: troyargonautsprotobuf.IMatchRecords, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchRecords message, length delimited. Does not implicitly {@link troyargonautsprotobuf.MatchRecords.verify|verify} messages.
         * @param message MatchRecords message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: troyargonautsprotobuf.IMatchRecords, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchRecords message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): troyargonautsprotobuf.MatchRecords;

        /**
         * Decodes a MatchRecords message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): troyargonautsprotobuf.MatchRecords;

        /**
         * Verifies a MatchRecords message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchRecords message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchRecords
         */
        public static fromObject(object: { [k: string]: any }): troyargonautsprotobuf.MatchRecords;

        /**
         * Creates a plain object from a MatchRecords message. Also converts values to other types if specified.
         * @param message MatchRecords
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: troyargonautsprotobuf.MatchRecords, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchRecords to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchRecords
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
