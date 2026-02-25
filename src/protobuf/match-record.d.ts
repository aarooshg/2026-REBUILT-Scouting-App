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

    /** TeleopPhase enum. */
    enum TeleopPhase {
        TRANSITION_SHIFT = 0,
        SHIFT_1 = 1,
        SHIFT_2 = 2,
        SHIFT_3 = 3,
        SHIFT_4 = 4,
        END_GAME = 5
    }

    /** PhaseActivity enum. */
    enum PhaseActivity {
        SCORED = 0,
        PICKUP = 1,
        DEFENSE = 2,
        FED = 3
    }

    /** PickupLocation enum. */
    enum PickupLocation {
        ALLIANCE_ZONE = 0,
        OUTPOST = 1,
        NEUTRAL_ZONE = 2,
        OPPONENT_AREA = 3
    }

    /** Properties of a TeleopPhaseRecord. */
    interface ITeleopPhaseRecord {

        /** TeleopPhaseRecord phase */
        phase?: (troyargonautsprotobuf.TeleopPhase|null);

        /** TeleopPhaseRecord activity */
        activity?: (troyargonautsprotobuf.PhaseActivity|null);

        /** TeleopPhaseRecord pickupLocation */
        pickupLocation?: (troyargonautsprotobuf.PickupLocation|null);

        /** TeleopPhaseRecord shotsMissed */
        shotsMissed?: (number|null);

        /** TeleopPhaseRecord shotsAttempted */
        shotsAttempted?: (number|null);
    }

    /** Represents a TeleopPhaseRecord. */
    class TeleopPhaseRecord implements ITeleopPhaseRecord {

        /**
         * Constructs a new TeleopPhaseRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: troyargonautsprotobuf.ITeleopPhaseRecord);

        /** TeleopPhaseRecord phase. */
        public phase: troyargonautsprotobuf.TeleopPhase;

        /** TeleopPhaseRecord activity. */
        public activity: troyargonautsprotobuf.PhaseActivity;

        /** TeleopPhaseRecord pickupLocation. */
        public pickupLocation: troyargonautsprotobuf.PickupLocation;

        /** TeleopPhaseRecord shotsMissed. */
        public shotsMissed: number;

        /** TeleopPhaseRecord shotsAttempted. */
        public shotsAttempted: number;

        /**
         * Creates a new TeleopPhaseRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TeleopPhaseRecord instance
         */
        public static create(properties?: troyargonautsprotobuf.ITeleopPhaseRecord): troyargonautsprotobuf.TeleopPhaseRecord;

        /**
         * Encodes the specified TeleopPhaseRecord message. Does not implicitly {@link troyargonautsprotobuf.TeleopPhaseRecord.verify|verify} messages.
         * @param message TeleopPhaseRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: troyargonautsprotobuf.ITeleopPhaseRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TeleopPhaseRecord message, length delimited. Does not implicitly {@link troyargonautsprotobuf.TeleopPhaseRecord.verify|verify} messages.
         * @param message TeleopPhaseRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: troyargonautsprotobuf.ITeleopPhaseRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TeleopPhaseRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TeleopPhaseRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): troyargonautsprotobuf.TeleopPhaseRecord;

        /**
         * Decodes a TeleopPhaseRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TeleopPhaseRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): troyargonautsprotobuf.TeleopPhaseRecord;

        /**
         * Verifies a TeleopPhaseRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TeleopPhaseRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TeleopPhaseRecord
         */
        public static fromObject(object: { [k: string]: any }): troyargonautsprotobuf.TeleopPhaseRecord;

        /**
         * Creates a plain object from a TeleopPhaseRecord message. Also converts values to other types if specified.
         * @param message TeleopPhaseRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: troyargonautsprotobuf.TeleopPhaseRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TeleopPhaseRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TeleopPhaseRecord
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** AutonPickupLocation enum. */
    enum AutonPickupLocation {
        DEPOT = 0,
        OUTPOST = 1,
        NEUTRAL_ZONE = 2
    }

    /** AutonPickupOutcome enum. */
    enum AutonPickupOutcome {
        FAILED = 0,
        ATTEMPTED = 1,
        SUCCESSFUL = 2
    }

    /** Properties of an AutonPickupRecord. */
    interface IAutonPickupRecord {

        /** AutonPickupRecord location */
        location?: (troyargonautsprotobuf.AutonPickupLocation|null);

        /** AutonPickupRecord outcome */
        outcome?: (troyargonautsprotobuf.AutonPickupOutcome|null);
    }

    /** Represents an AutonPickupRecord. */
    class AutonPickupRecord implements IAutonPickupRecord {

        /**
         * Constructs a new AutonPickupRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: troyargonautsprotobuf.IAutonPickupRecord);

        /** AutonPickupRecord location. */
        public location: troyargonautsprotobuf.AutonPickupLocation;

        /** AutonPickupRecord outcome. */
        public outcome: troyargonautsprotobuf.AutonPickupOutcome;

        /**
         * Creates a new AutonPickupRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AutonPickupRecord instance
         */
        public static create(properties?: troyargonautsprotobuf.IAutonPickupRecord): troyargonautsprotobuf.AutonPickupRecord;

        /**
         * Encodes the specified AutonPickupRecord message. Does not implicitly {@link troyargonautsprotobuf.AutonPickupRecord.verify|verify} messages.
         * @param message AutonPickupRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: troyargonautsprotobuf.IAutonPickupRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AutonPickupRecord message, length delimited. Does not implicitly {@link troyargonautsprotobuf.AutonPickupRecord.verify|verify} messages.
         * @param message AutonPickupRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: troyargonautsprotobuf.IAutonPickupRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AutonPickupRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AutonPickupRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): troyargonautsprotobuf.AutonPickupRecord;

        /**
         * Decodes an AutonPickupRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AutonPickupRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): troyargonautsprotobuf.AutonPickupRecord;

        /**
         * Verifies an AutonPickupRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AutonPickupRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AutonPickupRecord
         */
        public static fromObject(object: { [k: string]: any }): troyargonautsprotobuf.AutonPickupRecord;

        /**
         * Creates a plain object from an AutonPickupRecord message. Also converts values to other types if specified.
         * @param message AutonPickupRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: troyargonautsprotobuf.AutonPickupRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AutonPickupRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AutonPickupRecord
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** PreferredPath enum. */
    enum PreferredPath {
        NONE = 0,
        BUMP = 1,
        TRENCH = 2
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

        /** MatchRecord alliance */
        alliance?: (troyargonautsprotobuf.MatchRecord.Alliance|null);

        /** MatchRecord startingPosition */
        startingPosition?: (troyargonautsprotobuf.MatchRecord.StartingPosition|null);

        /** MatchRecord teleopPhases */
        teleopPhases?: (troyargonautsprotobuf.ITeleopPhaseRecord[]|null);

        /** MatchRecord preloadedGameElements */
        preloadedGameElements?: (number|null);

        /** MatchRecord robotMovedInAuton */
        robotMovedInAuton?: (boolean|null);

        /** MatchRecord autonPickups */
        autonPickups?: (troyargonautsprotobuf.IAutonPickupRecord[]|null);

        /** MatchRecord autonShotsMissed */
        autonShotsMissed?: (number|null);

        /** MatchRecord autonShotsAttempted */
        autonShotsAttempted?: (number|null);

        /** MatchRecord teleopShotsMissed */
        teleopShotsMissed?: (number|null);

        /** MatchRecord teleopShotsAttempted */
        teleopShotsAttempted?: (number|null);

        /** MatchRecord climbLevel */
        climbLevel?: (troyargonautsprotobuf.ClimbLevel|null);

        /** MatchRecord canGoOverBump */
        canGoOverBump?: (boolean|null);

        /** MatchRecord canGoUnderTrench */
        canGoUnderTrench?: (boolean|null);

        /** MatchRecord canClimbLevel1Auton */
        canClimbLevel1Auton?: (boolean|null);

        /** MatchRecord neutralZoneFeedingAuton */
        neutralZoneFeedingAuton?: (boolean|null);

        /** MatchRecord neutralZoneFeedingTeleop */
        neutralZoneFeedingTeleop?: (boolean|null);

        /** MatchRecord notes */
        notes?: (string|null);

        /** MatchRecord preferredPath */
        preferredPath?: (troyargonautsprotobuf.PreferredPath|null);
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

        /** MatchRecord alliance. */
        public alliance: troyargonautsprotobuf.MatchRecord.Alliance;

        /** MatchRecord startingPosition. */
        public startingPosition: troyargonautsprotobuf.MatchRecord.StartingPosition;

        /** MatchRecord teleopPhases. */
        public teleopPhases: troyargonautsprotobuf.ITeleopPhaseRecord[];

        /** MatchRecord preloadedGameElements. */
        public preloadedGameElements: number;

        /** MatchRecord robotMovedInAuton. */
        public robotMovedInAuton: boolean;

        /** MatchRecord autonPickups. */
        public autonPickups: troyargonautsprotobuf.IAutonPickupRecord[];

        /** MatchRecord autonShotsMissed. */
        public autonShotsMissed: number;

        /** MatchRecord autonShotsAttempted. */
        public autonShotsAttempted: number;

        /** MatchRecord teleopShotsMissed. */
        public teleopShotsMissed: number;

        /** MatchRecord teleopShotsAttempted. */
        public teleopShotsAttempted: number;

        /** MatchRecord climbLevel. */
        public climbLevel: troyargonautsprotobuf.ClimbLevel;

        /** MatchRecord canGoOverBump. */
        public canGoOverBump: boolean;

        /** MatchRecord canGoUnderTrench. */
        public canGoUnderTrench: boolean;

        /** MatchRecord canClimbLevel1Auton. */
        public canClimbLevel1Auton: boolean;

        /** MatchRecord neutralZoneFeedingAuton. */
        public neutralZoneFeedingAuton: boolean;

        /** MatchRecord neutralZoneFeedingTeleop. */
        public neutralZoneFeedingTeleop: boolean;

        /** MatchRecord notes. */
        public notes: string;

        /** MatchRecord preferredPath. */
        public preferredPath: troyargonautsprotobuf.PreferredPath;

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

    namespace MatchRecord {

        /** Alliance enum. */
        enum Alliance {
            R1 = 0,
            R2 = 1,
            R3 = 2,
            B1 = 3,
            B2 = 4,
            B3 = 5
        }

        /** StartingPosition enum. */
        enum StartingPosition {
            P1 = 0,
            P2 = 1,
            P3 = 2,
            P4 = 3,
            P5 = 4
        }
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
