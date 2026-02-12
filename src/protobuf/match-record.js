/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const troyargonautsprotobuf = $root.troyargonautsprotobuf = (() => {

    /**
     * Namespace troyargonautsprotobuf.
     * @exports troyargonautsprotobuf
     * @namespace
     */
    const troyargonautsprotobuf = {};

    /**
     * ClimbLevel enum.
     * @name troyargonautsprotobuf.ClimbLevel
     * @enum {number}
     * @property {number} CLIMB_NONE=0 CLIMB_NONE value
     * @property {number} LEVEL_1=1 LEVEL_1 value
     * @property {number} LEVEL_2=2 LEVEL_2 value
     * @property {number} LEVEL_3=3 LEVEL_3 value
     */
    troyargonautsprotobuf.ClimbLevel = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CLIMB_NONE"] = 0;
        values[valuesById[1] = "LEVEL_1"] = 1;
        values[valuesById[2] = "LEVEL_2"] = 2;
        values[valuesById[3] = "LEVEL_3"] = 3;
        return values;
    })();

    /**
     * TeleopPhase enum.
     * @name troyargonautsprotobuf.TeleopPhase
     * @enum {number}
     * @property {number} TRANSITION_SHIFT=0 TRANSITION_SHIFT value
     * @property {number} SHIFT_1=1 SHIFT_1 value
     * @property {number} SHIFT_2=2 SHIFT_2 value
     * @property {number} SHIFT_3=3 SHIFT_3 value
     * @property {number} SHIFT_4=4 SHIFT_4 value
     * @property {number} END_GAME=5 END_GAME value
     */
    troyargonautsprotobuf.TeleopPhase = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TRANSITION_SHIFT"] = 0;
        values[valuesById[1] = "SHIFT_1"] = 1;
        values[valuesById[2] = "SHIFT_2"] = 2;
        values[valuesById[3] = "SHIFT_3"] = 3;
        values[valuesById[4] = "SHIFT_4"] = 4;
        values[valuesById[5] = "END_GAME"] = 5;
        return values;
    })();

    /**
     * PhaseActivity enum.
     * @name troyargonautsprotobuf.PhaseActivity
     * @enum {number}
     * @property {number} SCORED=0 SCORED value
     * @property {number} PICKUP=1 PICKUP value
     * @property {number} DEFENSE=2 DEFENSE value
     * @property {number} FED=3 FED value
     */
    troyargonautsprotobuf.PhaseActivity = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SCORED"] = 0;
        values[valuesById[1] = "PICKUP"] = 1;
        values[valuesById[2] = "DEFENSE"] = 2;
        values[valuesById[3] = "FED"] = 3;
        return values;
    })();

    /**
     * PickupLocation enum.
     * @name troyargonautsprotobuf.PickupLocation
     * @enum {number}
     * @property {number} ALLIANCE_ZONE=0 ALLIANCE_ZONE value
     * @property {number} OUTPOST=1 OUTPOST value
     * @property {number} NEUTRAL_ZONE=2 NEUTRAL_ZONE value
     * @property {number} OPPONENT_AREA=3 OPPONENT_AREA value
     */
    troyargonautsprotobuf.PickupLocation = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ALLIANCE_ZONE"] = 0;
        values[valuesById[1] = "OUTPOST"] = 1;
        values[valuesById[2] = "NEUTRAL_ZONE"] = 2;
        values[valuesById[3] = "OPPONENT_AREA"] = 3;
        return values;
    })();

    troyargonautsprotobuf.TeleopPhaseRecord = (function() {

        /**
         * Properties of a TeleopPhaseRecord.
         * @memberof troyargonautsprotobuf
         * @interface ITeleopPhaseRecord
         * @property {troyargonautsprotobuf.TeleopPhase|null} [phase] TeleopPhaseRecord phase
         * @property {troyargonautsprotobuf.PhaseActivity|null} [activity] TeleopPhaseRecord activity
         * @property {troyargonautsprotobuf.PickupLocation|null} [pickupLocation] TeleopPhaseRecord pickupLocation
         */

        /**
         * Constructs a new TeleopPhaseRecord.
         * @memberof troyargonautsprotobuf
         * @classdesc Represents a TeleopPhaseRecord.
         * @implements ITeleopPhaseRecord
         * @constructor
         * @param {troyargonautsprotobuf.ITeleopPhaseRecord=} [properties] Properties to set
         */
        function TeleopPhaseRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TeleopPhaseRecord phase.
         * @member {troyargonautsprotobuf.TeleopPhase} phase
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @instance
         */
        TeleopPhaseRecord.prototype.phase = 0;

        /**
         * TeleopPhaseRecord activity.
         * @member {troyargonautsprotobuf.PhaseActivity} activity
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @instance
         */
        TeleopPhaseRecord.prototype.activity = 0;

        /**
         * TeleopPhaseRecord pickupLocation.
         * @member {troyargonautsprotobuf.PickupLocation} pickupLocation
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @instance
         */
        TeleopPhaseRecord.prototype.pickupLocation = 0;

        /**
         * Creates a new TeleopPhaseRecord instance using the specified properties.
         * @function create
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {troyargonautsprotobuf.ITeleopPhaseRecord=} [properties] Properties to set
         * @returns {troyargonautsprotobuf.TeleopPhaseRecord} TeleopPhaseRecord instance
         */
        TeleopPhaseRecord.create = function create(properties) {
            return new TeleopPhaseRecord(properties);
        };

        /**
         * Encodes the specified TeleopPhaseRecord message. Does not implicitly {@link troyargonautsprotobuf.TeleopPhaseRecord.verify|verify} messages.
         * @function encode
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {troyargonautsprotobuf.ITeleopPhaseRecord} message TeleopPhaseRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TeleopPhaseRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.phase != null && Object.hasOwnProperty.call(message, "phase"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.phase);
            if (message.activity != null && Object.hasOwnProperty.call(message, "activity"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.activity);
            if (message.pickupLocation != null && Object.hasOwnProperty.call(message, "pickupLocation"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.pickupLocation);
            return writer;
        };

        /**
         * Encodes the specified TeleopPhaseRecord message, length delimited. Does not implicitly {@link troyargonautsprotobuf.TeleopPhaseRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {troyargonautsprotobuf.ITeleopPhaseRecord} message TeleopPhaseRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TeleopPhaseRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TeleopPhaseRecord message from the specified reader or buffer.
         * @function decode
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {troyargonautsprotobuf.TeleopPhaseRecord} TeleopPhaseRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TeleopPhaseRecord.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.troyargonautsprotobuf.TeleopPhaseRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.phase = reader.int32();
                        break;
                    }
                case 2: {
                        message.activity = reader.int32();
                        break;
                    }
                case 3: {
                        message.pickupLocation = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TeleopPhaseRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {troyargonautsprotobuf.TeleopPhaseRecord} TeleopPhaseRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TeleopPhaseRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TeleopPhaseRecord message.
         * @function verify
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TeleopPhaseRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.phase != null && message.hasOwnProperty("phase"))
                switch (message.phase) {
                default:
                    return "phase: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.activity != null && message.hasOwnProperty("activity"))
                switch (message.activity) {
                default:
                    return "activity: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.pickupLocation != null && message.hasOwnProperty("pickupLocation"))
                switch (message.pickupLocation) {
                default:
                    return "pickupLocation: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a TeleopPhaseRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {troyargonautsprotobuf.TeleopPhaseRecord} TeleopPhaseRecord
         */
        TeleopPhaseRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.troyargonautsprotobuf.TeleopPhaseRecord)
                return object;
            let message = new $root.troyargonautsprotobuf.TeleopPhaseRecord();
            switch (object.phase) {
            default:
                if (typeof object.phase === "number") {
                    message.phase = object.phase;
                    break;
                }
                break;
            case "TRANSITION_SHIFT":
            case 0:
                message.phase = 0;
                break;
            case "SHIFT_1":
            case 1:
                message.phase = 1;
                break;
            case "SHIFT_2":
            case 2:
                message.phase = 2;
                break;
            case "SHIFT_3":
            case 3:
                message.phase = 3;
                break;
            case "SHIFT_4":
            case 4:
                message.phase = 4;
                break;
            case "END_GAME":
            case 5:
                message.phase = 5;
                break;
            }
            switch (object.activity) {
            default:
                if (typeof object.activity === "number") {
                    message.activity = object.activity;
                    break;
                }
                break;
            case "SCORED":
            case 0:
                message.activity = 0;
                break;
            case "PICKUP":
            case 1:
                message.activity = 1;
                break;
            case "DEFENSE":
            case 2:
                message.activity = 2;
                break;
            case "FED":
            case 3:
                message.activity = 3;
                break;
            }
            switch (object.pickupLocation) {
            default:
                if (typeof object.pickupLocation === "number") {
                    message.pickupLocation = object.pickupLocation;
                    break;
                }
                break;
            case "ALLIANCE_ZONE":
            case 0:
                message.pickupLocation = 0;
                break;
            case "OUTPOST":
            case 1:
                message.pickupLocation = 1;
                break;
            case "NEUTRAL_ZONE":
            case 2:
                message.pickupLocation = 2;
                break;
            case "OPPONENT_AREA":
            case 3:
                message.pickupLocation = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a TeleopPhaseRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {troyargonautsprotobuf.TeleopPhaseRecord} message TeleopPhaseRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TeleopPhaseRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.phase = options.enums === String ? "TRANSITION_SHIFT" : 0;
                object.activity = options.enums === String ? "SCORED" : 0;
                object.pickupLocation = options.enums === String ? "ALLIANCE_ZONE" : 0;
            }
            if (message.phase != null && message.hasOwnProperty("phase"))
                object.phase = options.enums === String ? $root.troyargonautsprotobuf.TeleopPhase[message.phase] === undefined ? message.phase : $root.troyargonautsprotobuf.TeleopPhase[message.phase] : message.phase;
            if (message.activity != null && message.hasOwnProperty("activity"))
                object.activity = options.enums === String ? $root.troyargonautsprotobuf.PhaseActivity[message.activity] === undefined ? message.activity : $root.troyargonautsprotobuf.PhaseActivity[message.activity] : message.activity;
            if (message.pickupLocation != null && message.hasOwnProperty("pickupLocation"))
                object.pickupLocation = options.enums === String ? $root.troyargonautsprotobuf.PickupLocation[message.pickupLocation] === undefined ? message.pickupLocation : $root.troyargonautsprotobuf.PickupLocation[message.pickupLocation] : message.pickupLocation;
            return object;
        };

        /**
         * Converts this TeleopPhaseRecord to JSON.
         * @function toJSON
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TeleopPhaseRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TeleopPhaseRecord
         * @function getTypeUrl
         * @memberof troyargonautsprotobuf.TeleopPhaseRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TeleopPhaseRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/troyargonautsprotobuf.TeleopPhaseRecord";
        };

        return TeleopPhaseRecord;
    })();

    troyargonautsprotobuf.MatchRecord = (function() {

        /**
         * Properties of a MatchRecord.
         * @memberof troyargonautsprotobuf
         * @interface IMatchRecord
         * @property {string|null} [id] MatchRecord id
         * @property {string|null} [team] MatchRecord team
         * @property {string|null} [match] MatchRecord match
         * @property {string|null} [scouter] MatchRecord scouter
         * @property {troyargonautsprotobuf.MatchRecord.Alliance|null} [alliance] MatchRecord alliance
         * @property {troyargonautsprotobuf.MatchRecord.StartingPosition|null} [startingPosition] MatchRecord startingPosition
         * @property {Array.<troyargonautsprotobuf.ITeleopPhaseRecord>|null} [teleopPhases] MatchRecord teleopPhases
         * @property {number|null} [preloadedGameElements] MatchRecord preloadedGameElements
         * @property {boolean|null} [robotMovedInAuton] MatchRecord robotMovedInAuton
         * @property {number|null} [autonShotsMissed] MatchRecord autonShotsMissed
         * @property {number|null} [autonShotsAttempted] MatchRecord autonShotsAttempted
         * @property {number|null} [teleopShotsMissed] MatchRecord teleopShotsMissed
         * @property {number|null} [teleopShotsAttempted] MatchRecord teleopShotsAttempted
         * @property {troyargonautsprotobuf.ClimbLevel|null} [climbLevel] MatchRecord climbLevel
         * @property {boolean|null} [canGoOverBump] MatchRecord canGoOverBump
         * @property {boolean|null} [canGoUnderTrench] MatchRecord canGoUnderTrench
         * @property {boolean|null} [canClimbLevel1Auton] MatchRecord canClimbLevel1Auton
         * @property {boolean|null} [neutralZoneFeedingAuton] MatchRecord neutralZoneFeedingAuton
         * @property {boolean|null} [neutralZoneFeedingTeleop] MatchRecord neutralZoneFeedingTeleop
         * @property {string|null} [notes] MatchRecord notes
         */

        /**
         * Constructs a new MatchRecord.
         * @memberof troyargonautsprotobuf
         * @classdesc Represents a MatchRecord.
         * @implements IMatchRecord
         * @constructor
         * @param {troyargonautsprotobuf.IMatchRecord=} [properties] Properties to set
         */
        function MatchRecord(properties) {
            this.teleopPhases = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchRecord id.
         * @member {string} id
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.id = "";

        /**
         * MatchRecord team.
         * @member {string} team
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.team = "";

        /**
         * MatchRecord match.
         * @member {string} match
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.match = "";

        /**
         * MatchRecord scouter.
         * @member {string} scouter
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.scouter = "";

        /**
         * MatchRecord alliance.
         * @member {troyargonautsprotobuf.MatchRecord.Alliance} alliance
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.alliance = 0;

        /**
         * MatchRecord startingPosition.
         * @member {troyargonautsprotobuf.MatchRecord.StartingPosition} startingPosition
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.startingPosition = 0;

        /**
         * MatchRecord teleopPhases.
         * @member {Array.<troyargonautsprotobuf.ITeleopPhaseRecord>} teleopPhases
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.teleopPhases = $util.emptyArray;

        /**
         * MatchRecord preloadedGameElements.
         * @member {number} preloadedGameElements
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.preloadedGameElements = 0;

        /**
         * MatchRecord robotMovedInAuton.
         * @member {boolean} robotMovedInAuton
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.robotMovedInAuton = false;

        /**
         * MatchRecord autonShotsMissed.
         * @member {number} autonShotsMissed
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.autonShotsMissed = 0;

        /**
         * MatchRecord autonShotsAttempted.
         * @member {number} autonShotsAttempted
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.autonShotsAttempted = 0;

        /**
         * MatchRecord teleopShotsMissed.
         * @member {number} teleopShotsMissed
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.teleopShotsMissed = 0;

        /**
         * MatchRecord teleopShotsAttempted.
         * @member {number} teleopShotsAttempted
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.teleopShotsAttempted = 0;

        /**
         * MatchRecord climbLevel.
         * @member {troyargonautsprotobuf.ClimbLevel} climbLevel
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.climbLevel = 0;

        /**
         * MatchRecord canGoOverBump.
         * @member {boolean} canGoOverBump
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.canGoOverBump = false;

        /**
         * MatchRecord canGoUnderTrench.
         * @member {boolean} canGoUnderTrench
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.canGoUnderTrench = false;

        /**
         * MatchRecord canClimbLevel1Auton.
         * @member {boolean} canClimbLevel1Auton
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.canClimbLevel1Auton = false;

        /**
         * MatchRecord neutralZoneFeedingAuton.
         * @member {boolean} neutralZoneFeedingAuton
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.neutralZoneFeedingAuton = false;

        /**
         * MatchRecord neutralZoneFeedingTeleop.
         * @member {boolean} neutralZoneFeedingTeleop
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.neutralZoneFeedingTeleop = false;

        /**
         * MatchRecord notes.
         * @member {string} notes
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.notes = "";

        /**
         * Creates a new MatchRecord instance using the specified properties.
         * @function create
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {troyargonautsprotobuf.IMatchRecord=} [properties] Properties to set
         * @returns {troyargonautsprotobuf.MatchRecord} MatchRecord instance
         */
        MatchRecord.create = function create(properties) {
            return new MatchRecord(properties);
        };

        /**
         * Encodes the specified MatchRecord message. Does not implicitly {@link troyargonautsprotobuf.MatchRecord.verify|verify} messages.
         * @function encode
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {troyargonautsprotobuf.IMatchRecord} message MatchRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.team);
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.match);
            if (message.scouter != null && Object.hasOwnProperty.call(message, "scouter"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.scouter);
            if (message.autonShotsMissed != null && Object.hasOwnProperty.call(message, "autonShotsMissed"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.autonShotsMissed);
            if (message.autonShotsAttempted != null && Object.hasOwnProperty.call(message, "autonShotsAttempted"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.autonShotsAttempted);
            if (message.teleopShotsMissed != null && Object.hasOwnProperty.call(message, "teleopShotsMissed"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.teleopShotsMissed);
            if (message.teleopShotsAttempted != null && Object.hasOwnProperty.call(message, "teleopShotsAttempted"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.teleopShotsAttempted);
            if (message.climbLevel != null && Object.hasOwnProperty.call(message, "climbLevel"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.climbLevel);
            if (message.canGoOverBump != null && Object.hasOwnProperty.call(message, "canGoOverBump"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.canGoOverBump);
            if (message.canGoUnderTrench != null && Object.hasOwnProperty.call(message, "canGoUnderTrench"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.canGoUnderTrench);
            if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.notes);
            if (message.canClimbLevel1Auton != null && Object.hasOwnProperty.call(message, "canClimbLevel1Auton"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.canClimbLevel1Auton);
            if (message.preloadedGameElements != null && Object.hasOwnProperty.call(message, "preloadedGameElements"))
                writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.preloadedGameElements);
            if (message.neutralZoneFeedingAuton != null && Object.hasOwnProperty.call(message, "neutralZoneFeedingAuton"))
                writer.uint32(/* id 15, wireType 0 =*/120).bool(message.neutralZoneFeedingAuton);
            if (message.neutralZoneFeedingTeleop != null && Object.hasOwnProperty.call(message, "neutralZoneFeedingTeleop"))
                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.neutralZoneFeedingTeleop);
            if (message.alliance != null && Object.hasOwnProperty.call(message, "alliance"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.alliance);
            if (message.startingPosition != null && Object.hasOwnProperty.call(message, "startingPosition"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.startingPosition);
            if (message.teleopPhases != null && message.teleopPhases.length)
                for (let i = 0; i < message.teleopPhases.length; ++i)
                    $root.troyargonautsprotobuf.TeleopPhaseRecord.encode(message.teleopPhases[i], writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
            if (message.robotMovedInAuton != null && Object.hasOwnProperty.call(message, "robotMovedInAuton"))
                writer.uint32(/* id 20, wireType 0 =*/160).bool(message.robotMovedInAuton);
            return writer;
        };

        /**
         * Encodes the specified MatchRecord message, length delimited. Does not implicitly {@link troyargonautsprotobuf.MatchRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {troyargonautsprotobuf.IMatchRecord} message MatchRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchRecord message from the specified reader or buffer.
         * @function decode
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {troyargonautsprotobuf.MatchRecord} MatchRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRecord.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.troyargonautsprotobuf.MatchRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.team = reader.string();
                        break;
                    }
                case 3: {
                        message.match = reader.string();
                        break;
                    }
                case 4: {
                        message.scouter = reader.string();
                        break;
                    }
                case 17: {
                        message.alliance = reader.int32();
                        break;
                    }
                case 18: {
                        message.startingPosition = reader.int32();
                        break;
                    }
                case 19: {
                        if (!(message.teleopPhases && message.teleopPhases.length))
                            message.teleopPhases = [];
                        message.teleopPhases.push($root.troyargonautsprotobuf.TeleopPhaseRecord.decode(reader, reader.uint32()));
                        break;
                    }
                case 14: {
                        message.preloadedGameElements = reader.uint32();
                        break;
                    }
                case 20: {
                        message.robotMovedInAuton = reader.bool();
                        break;
                    }
                case 5: {
                        message.autonShotsMissed = reader.uint32();
                        break;
                    }
                case 6: {
                        message.autonShotsAttempted = reader.uint32();
                        break;
                    }
                case 7: {
                        message.teleopShotsMissed = reader.uint32();
                        break;
                    }
                case 8: {
                        message.teleopShotsAttempted = reader.uint32();
                        break;
                    }
                case 9: {
                        message.climbLevel = reader.int32();
                        break;
                    }
                case 10: {
                        message.canGoOverBump = reader.bool();
                        break;
                    }
                case 11: {
                        message.canGoUnderTrench = reader.bool();
                        break;
                    }
                case 13: {
                        message.canClimbLevel1Auton = reader.bool();
                        break;
                    }
                case 15: {
                        message.neutralZoneFeedingAuton = reader.bool();
                        break;
                    }
                case 16: {
                        message.neutralZoneFeedingTeleop = reader.bool();
                        break;
                    }
                case 12: {
                        message.notes = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {troyargonautsprotobuf.MatchRecord} MatchRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchRecord message.
         * @function verify
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.team != null && message.hasOwnProperty("team"))
                if (!$util.isString(message.team))
                    return "team: string expected";
            if (message.match != null && message.hasOwnProperty("match"))
                if (!$util.isString(message.match))
                    return "match: string expected";
            if (message.scouter != null && message.hasOwnProperty("scouter"))
                if (!$util.isString(message.scouter))
                    return "scouter: string expected";
            if (message.alliance != null && message.hasOwnProperty("alliance"))
                switch (message.alliance) {
                default:
                    return "alliance: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.startingPosition != null && message.hasOwnProperty("startingPosition"))
                switch (message.startingPosition) {
                default:
                    return "startingPosition: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.teleopPhases != null && message.hasOwnProperty("teleopPhases")) {
                if (!Array.isArray(message.teleopPhases))
                    return "teleopPhases: array expected";
                for (let i = 0; i < message.teleopPhases.length; ++i) {
                    let error = $root.troyargonautsprotobuf.TeleopPhaseRecord.verify(message.teleopPhases[i]);
                    if (error)
                        return "teleopPhases." + error;
                }
            }
            if (message.preloadedGameElements != null && message.hasOwnProperty("preloadedGameElements"))
                if (!$util.isInteger(message.preloadedGameElements))
                    return "preloadedGameElements: integer expected";
            if (message.robotMovedInAuton != null && message.hasOwnProperty("robotMovedInAuton"))
                if (typeof message.robotMovedInAuton !== "boolean")
                    return "robotMovedInAuton: boolean expected";
            if (message.autonShotsMissed != null && message.hasOwnProperty("autonShotsMissed"))
                if (!$util.isInteger(message.autonShotsMissed))
                    return "autonShotsMissed: integer expected";
            if (message.autonShotsAttempted != null && message.hasOwnProperty("autonShotsAttempted"))
                if (!$util.isInteger(message.autonShotsAttempted))
                    return "autonShotsAttempted: integer expected";
            if (message.teleopShotsMissed != null && message.hasOwnProperty("teleopShotsMissed"))
                if (!$util.isInteger(message.teleopShotsMissed))
                    return "teleopShotsMissed: integer expected";
            if (message.teleopShotsAttempted != null && message.hasOwnProperty("teleopShotsAttempted"))
                if (!$util.isInteger(message.teleopShotsAttempted))
                    return "teleopShotsAttempted: integer expected";
            if (message.climbLevel != null && message.hasOwnProperty("climbLevel"))
                switch (message.climbLevel) {
                default:
                    return "climbLevel: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.canGoOverBump != null && message.hasOwnProperty("canGoOverBump"))
                if (typeof message.canGoOverBump !== "boolean")
                    return "canGoOverBump: boolean expected";
            if (message.canGoUnderTrench != null && message.hasOwnProperty("canGoUnderTrench"))
                if (typeof message.canGoUnderTrench !== "boolean")
                    return "canGoUnderTrench: boolean expected";
            if (message.canClimbLevel1Auton != null && message.hasOwnProperty("canClimbLevel1Auton"))
                if (typeof message.canClimbLevel1Auton !== "boolean")
                    return "canClimbLevel1Auton: boolean expected";
            if (message.neutralZoneFeedingAuton != null && message.hasOwnProperty("neutralZoneFeedingAuton"))
                if (typeof message.neutralZoneFeedingAuton !== "boolean")
                    return "neutralZoneFeedingAuton: boolean expected";
            if (message.neutralZoneFeedingTeleop != null && message.hasOwnProperty("neutralZoneFeedingTeleop"))
                if (typeof message.neutralZoneFeedingTeleop !== "boolean")
                    return "neutralZoneFeedingTeleop: boolean expected";
            if (message.notes != null && message.hasOwnProperty("notes"))
                if (!$util.isString(message.notes))
                    return "notes: string expected";
            return null;
        };

        /**
         * Creates a MatchRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {troyargonautsprotobuf.MatchRecord} MatchRecord
         */
        MatchRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.troyargonautsprotobuf.MatchRecord)
                return object;
            let message = new $root.troyargonautsprotobuf.MatchRecord();
            if (object.id != null)
                message.id = String(object.id);
            if (object.team != null)
                message.team = String(object.team);
            if (object.match != null)
                message.match = String(object.match);
            if (object.scouter != null)
                message.scouter = String(object.scouter);
            switch (object.alliance) {
            default:
                if (typeof object.alliance === "number") {
                    message.alliance = object.alliance;
                    break;
                }
                break;
            case "R1":
            case 0:
                message.alliance = 0;
                break;
            case "R2":
            case 1:
                message.alliance = 1;
                break;
            case "R3":
            case 2:
                message.alliance = 2;
                break;
            case "B1":
            case 3:
                message.alliance = 3;
                break;
            case "B2":
            case 4:
                message.alliance = 4;
                break;
            case "B3":
            case 5:
                message.alliance = 5;
                break;
            }
            switch (object.startingPosition) {
            default:
                if (typeof object.startingPosition === "number") {
                    message.startingPosition = object.startingPosition;
                    break;
                }
                break;
            case "P1":
            case 0:
                message.startingPosition = 0;
                break;
            case "P2":
            case 1:
                message.startingPosition = 1;
                break;
            case "P3":
            case 2:
                message.startingPosition = 2;
                break;
            case "P4":
            case 3:
                message.startingPosition = 3;
                break;
            case "P5":
            case 4:
                message.startingPosition = 4;
                break;
            }
            if (object.teleopPhases) {
                if (!Array.isArray(object.teleopPhases))
                    throw TypeError(".troyargonautsprotobuf.MatchRecord.teleopPhases: array expected");
                message.teleopPhases = [];
                for (let i = 0; i < object.teleopPhases.length; ++i) {
                    if (typeof object.teleopPhases[i] !== "object")
                        throw TypeError(".troyargonautsprotobuf.MatchRecord.teleopPhases: object expected");
                    message.teleopPhases[i] = $root.troyargonautsprotobuf.TeleopPhaseRecord.fromObject(object.teleopPhases[i]);
                }
            }
            if (object.preloadedGameElements != null)
                message.preloadedGameElements = object.preloadedGameElements >>> 0;
            if (object.robotMovedInAuton != null)
                message.robotMovedInAuton = Boolean(object.robotMovedInAuton);
            if (object.autonShotsMissed != null)
                message.autonShotsMissed = object.autonShotsMissed >>> 0;
            if (object.autonShotsAttempted != null)
                message.autonShotsAttempted = object.autonShotsAttempted >>> 0;
            if (object.teleopShotsMissed != null)
                message.teleopShotsMissed = object.teleopShotsMissed >>> 0;
            if (object.teleopShotsAttempted != null)
                message.teleopShotsAttempted = object.teleopShotsAttempted >>> 0;
            switch (object.climbLevel) {
            default:
                if (typeof object.climbLevel === "number") {
                    message.climbLevel = object.climbLevel;
                    break;
                }
                break;
            case "CLIMB_NONE":
            case 0:
                message.climbLevel = 0;
                break;
            case "LEVEL_1":
            case 1:
                message.climbLevel = 1;
                break;
            case "LEVEL_2":
            case 2:
                message.climbLevel = 2;
                break;
            case "LEVEL_3":
            case 3:
                message.climbLevel = 3;
                break;
            }
            if (object.canGoOverBump != null)
                message.canGoOverBump = Boolean(object.canGoOverBump);
            if (object.canGoUnderTrench != null)
                message.canGoUnderTrench = Boolean(object.canGoUnderTrench);
            if (object.canClimbLevel1Auton != null)
                message.canClimbLevel1Auton = Boolean(object.canClimbLevel1Auton);
            if (object.neutralZoneFeedingAuton != null)
                message.neutralZoneFeedingAuton = Boolean(object.neutralZoneFeedingAuton);
            if (object.neutralZoneFeedingTeleop != null)
                message.neutralZoneFeedingTeleop = Boolean(object.neutralZoneFeedingTeleop);
            if (object.notes != null)
                message.notes = String(object.notes);
            return message;
        };

        /**
         * Creates a plain object from a MatchRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {troyargonautsprotobuf.MatchRecord} message MatchRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.teleopPhases = [];
            if (options.defaults) {
                object.id = "";
                object.team = "";
                object.match = "";
                object.scouter = "";
                object.autonShotsMissed = 0;
                object.autonShotsAttempted = 0;
                object.teleopShotsMissed = 0;
                object.teleopShotsAttempted = 0;
                object.climbLevel = options.enums === String ? "CLIMB_NONE" : 0;
                object.canGoOverBump = false;
                object.canGoUnderTrench = false;
                object.notes = "";
                object.canClimbLevel1Auton = false;
                object.preloadedGameElements = 0;
                object.neutralZoneFeedingAuton = false;
                object.neutralZoneFeedingTeleop = false;
                object.alliance = options.enums === String ? "R1" : 0;
                object.startingPosition = options.enums === String ? "P1" : 0;
                object.robotMovedInAuton = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.team != null && message.hasOwnProperty("team"))
                object.team = message.team;
            if (message.match != null && message.hasOwnProperty("match"))
                object.match = message.match;
            if (message.scouter != null && message.hasOwnProperty("scouter"))
                object.scouter = message.scouter;
            if (message.autonShotsMissed != null && message.hasOwnProperty("autonShotsMissed"))
                object.autonShotsMissed = message.autonShotsMissed;
            if (message.autonShotsAttempted != null && message.hasOwnProperty("autonShotsAttempted"))
                object.autonShotsAttempted = message.autonShotsAttempted;
            if (message.teleopShotsMissed != null && message.hasOwnProperty("teleopShotsMissed"))
                object.teleopShotsMissed = message.teleopShotsMissed;
            if (message.teleopShotsAttempted != null && message.hasOwnProperty("teleopShotsAttempted"))
                object.teleopShotsAttempted = message.teleopShotsAttempted;
            if (message.climbLevel != null && message.hasOwnProperty("climbLevel"))
                object.climbLevel = options.enums === String ? $root.troyargonautsprotobuf.ClimbLevel[message.climbLevel] === undefined ? message.climbLevel : $root.troyargonautsprotobuf.ClimbLevel[message.climbLevel] : message.climbLevel;
            if (message.canGoOverBump != null && message.hasOwnProperty("canGoOverBump"))
                object.canGoOverBump = message.canGoOverBump;
            if (message.canGoUnderTrench != null && message.hasOwnProperty("canGoUnderTrench"))
                object.canGoUnderTrench = message.canGoUnderTrench;
            if (message.notes != null && message.hasOwnProperty("notes"))
                object.notes = message.notes;
            if (message.canClimbLevel1Auton != null && message.hasOwnProperty("canClimbLevel1Auton"))
                object.canClimbLevel1Auton = message.canClimbLevel1Auton;
            if (message.preloadedGameElements != null && message.hasOwnProperty("preloadedGameElements"))
                object.preloadedGameElements = message.preloadedGameElements;
            if (message.neutralZoneFeedingAuton != null && message.hasOwnProperty("neutralZoneFeedingAuton"))
                object.neutralZoneFeedingAuton = message.neutralZoneFeedingAuton;
            if (message.neutralZoneFeedingTeleop != null && message.hasOwnProperty("neutralZoneFeedingTeleop"))
                object.neutralZoneFeedingTeleop = message.neutralZoneFeedingTeleop;
            if (message.alliance != null && message.hasOwnProperty("alliance"))
                object.alliance = options.enums === String ? $root.troyargonautsprotobuf.MatchRecord.Alliance[message.alliance] === undefined ? message.alliance : $root.troyargonautsprotobuf.MatchRecord.Alliance[message.alliance] : message.alliance;
            if (message.startingPosition != null && message.hasOwnProperty("startingPosition"))
                object.startingPosition = options.enums === String ? $root.troyargonautsprotobuf.MatchRecord.StartingPosition[message.startingPosition] === undefined ? message.startingPosition : $root.troyargonautsprotobuf.MatchRecord.StartingPosition[message.startingPosition] : message.startingPosition;
            if (message.teleopPhases && message.teleopPhases.length) {
                object.teleopPhases = [];
                for (let j = 0; j < message.teleopPhases.length; ++j)
                    object.teleopPhases[j] = $root.troyargonautsprotobuf.TeleopPhaseRecord.toObject(message.teleopPhases[j], options);
            }
            if (message.robotMovedInAuton != null && message.hasOwnProperty("robotMovedInAuton"))
                object.robotMovedInAuton = message.robotMovedInAuton;
            return object;
        };

        /**
         * Converts this MatchRecord to JSON.
         * @function toJSON
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchRecord
         * @function getTypeUrl
         * @memberof troyargonautsprotobuf.MatchRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/troyargonautsprotobuf.MatchRecord";
        };

        /**
         * Alliance enum.
         * @name troyargonautsprotobuf.MatchRecord.Alliance
         * @enum {number}
         * @property {number} R1=0 R1 value
         * @property {number} R2=1 R2 value
         * @property {number} R3=2 R3 value
         * @property {number} B1=3 B1 value
         * @property {number} B2=4 B2 value
         * @property {number} B3=5 B3 value
         */
        MatchRecord.Alliance = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "R1"] = 0;
            values[valuesById[1] = "R2"] = 1;
            values[valuesById[2] = "R3"] = 2;
            values[valuesById[3] = "B1"] = 3;
            values[valuesById[4] = "B2"] = 4;
            values[valuesById[5] = "B3"] = 5;
            return values;
        })();

        /**
         * StartingPosition enum.
         * @name troyargonautsprotobuf.MatchRecord.StartingPosition
         * @enum {number}
         * @property {number} P1=0 P1 value
         * @property {number} P2=1 P2 value
         * @property {number} P3=2 P3 value
         * @property {number} P4=3 P4 value
         * @property {number} P5=4 P5 value
         */
        MatchRecord.StartingPosition = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "P1"] = 0;
            values[valuesById[1] = "P2"] = 1;
            values[valuesById[2] = "P3"] = 2;
            values[valuesById[3] = "P4"] = 3;
            values[valuesById[4] = "P5"] = 4;
            return values;
        })();

        return MatchRecord;
    })();

    troyargonautsprotobuf.MatchRecords = (function() {

        /**
         * Properties of a MatchRecords.
         * @memberof troyargonautsprotobuf
         * @interface IMatchRecords
         * @property {Array.<troyargonautsprotobuf.IMatchRecord>|null} [records] MatchRecords records
         */

        /**
         * Constructs a new MatchRecords.
         * @memberof troyargonautsprotobuf
         * @classdesc Represents a MatchRecords.
         * @implements IMatchRecords
         * @constructor
         * @param {troyargonautsprotobuf.IMatchRecords=} [properties] Properties to set
         */
        function MatchRecords(properties) {
            this.records = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchRecords records.
         * @member {Array.<troyargonautsprotobuf.IMatchRecord>} records
         * @memberof troyargonautsprotobuf.MatchRecords
         * @instance
         */
        MatchRecords.prototype.records = $util.emptyArray;

        /**
         * Creates a new MatchRecords instance using the specified properties.
         * @function create
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {troyargonautsprotobuf.IMatchRecords=} [properties] Properties to set
         * @returns {troyargonautsprotobuf.MatchRecords} MatchRecords instance
         */
        MatchRecords.create = function create(properties) {
            return new MatchRecords(properties);
        };

        /**
         * Encodes the specified MatchRecords message. Does not implicitly {@link troyargonautsprotobuf.MatchRecords.verify|verify} messages.
         * @function encode
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {troyargonautsprotobuf.IMatchRecords} message MatchRecords message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRecords.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    $root.troyargonautsprotobuf.MatchRecord.encode(message.records[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MatchRecords message, length delimited. Does not implicitly {@link troyargonautsprotobuf.MatchRecords.verify|verify} messages.
         * @function encodeDelimited
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {troyargonautsprotobuf.IMatchRecords} message MatchRecords message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRecords.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchRecords message from the specified reader or buffer.
         * @function decode
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {troyargonautsprotobuf.MatchRecords} MatchRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRecords.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.troyargonautsprotobuf.MatchRecords();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.records && message.records.length))
                            message.records = [];
                        message.records.push($root.troyargonautsprotobuf.MatchRecord.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchRecords message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {troyargonautsprotobuf.MatchRecords} MatchRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRecords.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchRecords message.
         * @function verify
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchRecords.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.records != null && message.hasOwnProperty("records")) {
                if (!Array.isArray(message.records))
                    return "records: array expected";
                for (let i = 0; i < message.records.length; ++i) {
                    let error = $root.troyargonautsprotobuf.MatchRecord.verify(message.records[i]);
                    if (error)
                        return "records." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MatchRecords message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {troyargonautsprotobuf.MatchRecords} MatchRecords
         */
        MatchRecords.fromObject = function fromObject(object) {
            if (object instanceof $root.troyargonautsprotobuf.MatchRecords)
                return object;
            let message = new $root.troyargonautsprotobuf.MatchRecords();
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".troyargonautsprotobuf.MatchRecords.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i) {
                    if (typeof object.records[i] !== "object")
                        throw TypeError(".troyargonautsprotobuf.MatchRecords.records: object expected");
                    message.records[i] = $root.troyargonautsprotobuf.MatchRecord.fromObject(object.records[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MatchRecords message. Also converts values to other types if specified.
         * @function toObject
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {troyargonautsprotobuf.MatchRecords} message MatchRecords
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchRecords.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.records = [];
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.troyargonautsprotobuf.MatchRecord.toObject(message.records[j], options);
            }
            return object;
        };

        /**
         * Converts this MatchRecords to JSON.
         * @function toJSON
         * @memberof troyargonautsprotobuf.MatchRecords
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchRecords.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchRecords
         * @function getTypeUrl
         * @memberof troyargonautsprotobuf.MatchRecords
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchRecords.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/troyargonautsprotobuf.MatchRecords";
        };

        return MatchRecords;
    })();

    return troyargonautsprotobuf;
})();

export { $root as default };
