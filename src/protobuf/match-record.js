 
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

    troyargonautsprotobuf.MatchRecord = (function() {

        /**
         * Properties of a MatchRecord.
         * @memberof troyargonautsprotobuf
         * @interface IMatchRecord
         * @property {string|null} [id] MatchRecord id
         * @property {string|null} [team] MatchRecord team
         * @property {string|null} [match] MatchRecord match
         * @property {string|null} [scouter] MatchRecord scouter
         * @property {number|null} [autonMainScore] MatchRecord autonMainScore
         * @property {number|null} [teleopMainScore] MatchRecord teleopMainScore
         * @property {troyargonautsprotobuf.ClimbLevel|null} [climbLevel] MatchRecord climbLevel
         * @property {boolean|null} [canGoOverBump] MatchRecord canGoOverBump
         * @property {boolean|null} [canGoUnderTrench] MatchRecord canGoUnderTrench
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
         * MatchRecord autonMainScore.
         * @member {number} autonMainScore
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.autonMainScore = 0;

        /**
         * MatchRecord teleopMainScore.
         * @member {number} teleopMainScore
         * @memberof troyargonautsprotobuf.MatchRecord
         * @instance
         */
        MatchRecord.prototype.teleopMainScore = 0;

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
            if (message.autonMainScore != null && Object.hasOwnProperty.call(message, "autonMainScore"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.autonMainScore);
            if (message.teleopMainScore != null && Object.hasOwnProperty.call(message, "teleopMainScore"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.teleopMainScore);
            if (message.climbLevel != null && Object.hasOwnProperty.call(message, "climbLevel"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.climbLevel);
            if (message.canGoOverBump != null && Object.hasOwnProperty.call(message, "canGoOverBump"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.canGoOverBump);
            if (message.canGoUnderTrench != null && Object.hasOwnProperty.call(message, "canGoUnderTrench"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.canGoUnderTrench);
            if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.notes);
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
                case 5: {
                        message.autonMainScore = reader.uint32();
                        break;
                    }
                case 6: {
                        message.teleopMainScore = reader.uint32();
                        break;
                    }
                case 7: {
                        message.climbLevel = reader.int32();
                        break;
                    }
                case 8: {
                        message.canGoOverBump = reader.bool();
                        break;
                    }
                case 9: {
                        message.canGoUnderTrench = reader.bool();
                        break;
                    }
                case 10: {
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
            if (message.autonMainScore != null && message.hasOwnProperty("autonMainScore"))
                if (!$util.isInteger(message.autonMainScore))
                    return "autonMainScore: integer expected";
            if (message.teleopMainScore != null && message.hasOwnProperty("teleopMainScore"))
                if (!$util.isInteger(message.teleopMainScore))
                    return "teleopMainScore: integer expected";
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
            if (object.autonMainScore != null)
                message.autonMainScore = object.autonMainScore >>> 0;
            if (object.teleopMainScore != null)
                message.teleopMainScore = object.teleopMainScore >>> 0;
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
            if (options.defaults) {
                object.id = "";
                object.team = "";
                object.match = "";
                object.scouter = "";
                object.autonMainScore = 0;
                object.teleopMainScore = 0;
                object.climbLevel = options.enums === String ? "CLIMB_NONE" : 0;
                object.canGoOverBump = false;
                object.canGoUnderTrench = false;
                object.notes = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.team != null && message.hasOwnProperty("team"))
                object.team = message.team;
            if (message.match != null && message.hasOwnProperty("match"))
                object.match = message.match;
            if (message.scouter != null && message.hasOwnProperty("scouter"))
                object.scouter = message.scouter;
            if (message.autonMainScore != null && message.hasOwnProperty("autonMainScore"))
                object.autonMainScore = message.autonMainScore;
            if (message.teleopMainScore != null && message.hasOwnProperty("teleopMainScore"))
                object.teleopMainScore = message.teleopMainScore;
            if (message.climbLevel != null && message.hasOwnProperty("climbLevel"))
                object.climbLevel = options.enums === String ? $root.troyargonautsprotobuf.ClimbLevel[message.climbLevel] === undefined ? message.climbLevel : $root.troyargonautsprotobuf.ClimbLevel[message.climbLevel] : message.climbLevel;
            if (message.canGoOverBump != null && message.hasOwnProperty("canGoOverBump"))
                object.canGoOverBump = message.canGoOverBump;
            if (message.canGoUnderTrench != null && message.hasOwnProperty("canGoUnderTrench"))
                object.canGoUnderTrench = message.canGoUnderTrench;
            if (message.notes != null && message.hasOwnProperty("notes"))
                object.notes = message.notes;
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
