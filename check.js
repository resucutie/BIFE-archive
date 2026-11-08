// Written by The Local Doe. <3
let fs = require("fs").promises;
let crypto = require("crypto");
let crc = require("crc");
let behaviorList = require("./BehaviorList.json")["BehaviorNames"];

let order = [
	0x09,
	0x18,
	0x0C,
	0x05,
	0x04,
	0x07,
	0x16,
	0x08,
	0x17,
	0x0A,
	0x0B,
	0x24,
	0x0D,
	0x0E,
	0x0F,
	0x10,
	0x06,
	0x1A,
	0x11,
	0x13,
	0x15,
	0x1C,
	0x1D,
	0x12,
	0x1E,
	0x21,
	0x22,
	0x14,
	0x1F,
	0x19,
	0x1B
];

let starNames = [
	"Local",
	"Troll",
	"C1",
	"C2",
	"C3",
	"C4",
	"C5",
	"C6",
	"C7",
	"C8",
	"C9",
	"C10",
	"C11",
	"C12",
	"C13",
	"C14",
	"C15",
	"B1",
	"B2",
	"B3",
	"PSS",
	"MC",
	"WC",
	"VC",
	"S1", // rainbow clouds
	"S2", // aquarium
	"S3", // end cake screen
	"S4", // extended IDs start here
	"S5",
	"S6",
	"S7",
	"S8",
	"S9",
	"S10",
	"S12",
	"S13",
	"S14",
	"S15"
];

let template = {
	"romInfo": {
        name: undefined,
        version: undefined,
		areaTotal: 0,
		starTotal: 0,
		minUniqueAreaStars: 0,
		maxUniqueAreaStars: 0,
		minUniqueGameStars: 0,
		maxUniqueGameStars: 0
	},
	"text": {
		dialogue: {},
		levelNames: {},
		actNames: {},
		endingText: {},
		fileMenu: {},
		credits: ""
	},
	stars: {
        "OW": undefined,
        "C1": undefined,
        "C2": undefined,
        "C3": undefined,
        "C4": undefined,
        "C5": undefined,
        "C6": undefined,
        "C7": undefined,
        "C8": undefined,
        "C9": undefined,
        "C10": undefined,
        "C11": undefined,
        "C12": undefined,
        "C13": undefined,
        "C14": undefined,
        "C15": undefined,

        "B1": undefined,
        "B2": undefined,
        "B3": undefined,
        "PSS": undefined,
        "MC": undefined,
        "WC": undefined,
        "VC": undefined,
        "S1": undefined,
        "S2": undefined,
        "S3": undefined,

        "EX1": undefined,
        "EX2": undefined,
        "EX3": undefined,
        "EX4": undefined,
        "EX5": undefined,

        "EX6": undefined,
        "EX7": undefined,
        "EX8": undefined,
        "EX9": undefined,
        "EX10": undefined,
        "EX11": undefined,
        "EX12": undefined,
        "EX13": undefined,
        "EX14": undefined,
        "EX15": undefined,

        "EXB1": undefined,
        "EXB2": undefined,
        "EXB3": undefined,
        "EXPSS": undefined,
        "EXMC": undefined,
        "EXWC": undefined,
        "EXVC": undefined,
        "EXS1": undefined,
        "EXS2": undefined,
        "EXS3": undefined,
        "EXS4": undefined,
        "EXS5": undefined,
        "EXS6": undefined,
        "EXS7": undefined,
        "EXS8": undefined,
        "EXS9": undefined,
        "EXS10": undefined,

        "EXS11": undefined,
        "EXS12": undefined,
        "EXS13": undefined,
        "EXS14": undefined,
        "EXS15": undefined
    },
    starList: "",
	// first floor
	"9": {
		"name": "BOB OMB BATTLEFIELD",
		"id": "C1"
	},
	"24": {
		"name": "WHOMPS FORTRESS",
		"id": "C2"
	},
	"12": {
		"name": "JOLLY ROGER BAY",
		"id": "C3"
	},
	"5": {
		"name": "COOL COOL MOUNTAIN",
		"id": "C4"
	},
	"4": {
		"name": "BIG BOOS HAUNT",
		"id": "C5"
	},
	// basement
	"7": {
		"name": "HAZY MAZE",
		"id": "C6"
	},
	"22": {
		"name": "LETHAL LAVA LAND",
		"id": "C7"
	},
	"8": {
		"name": "SHIFTING SAND LAND",
		"id": "C8"
	},
	"23": {
		"name": "DIRE DIRE DOCKS",
		"id": "C9"
	},
	// second floor
	"10": {
		"name": "SNOWMANS LAND",
		"id": "C10"
	},
	"11": {
		"name": "WET DRY WORLD",
		"id": "C11"
	},
	"36": {
		"name": "TALL TALL MOUNTAIN",
		"id": "C12"
	},
	"13": {
		"name": "TINY HUGE ISLAND",
		"id": "C13"
	},
	// third floor
	"14": {
		"name": "TICK TOCK CLOCK",
		"id": "C14"
	},
	"15": {
		"name": "RAINBOW RIDE",
		"id": "C15"
	},
	// castle areas
	"16": {
		"name": "CASTLE GROUNDS",
		"id": "OW"
	},
	"6": {
		"name": "INSIDE CASTLE",
		"id": "OW"
	},
	"26": {
		"name": "CASTLE COURTYARD",
		"id": "OW"
	},
	// bowser courses
	"17": {
		"name": "BOWSER FIRST COURSE",
		"id": "B1"
	},
	"19": {
		"name": "BOWSER SECOND COURSE",
		"id": "B2"
	},
	"21": {
		"name": "BOWSER THIRD COURSE",
		"id": "B3"
	},
	// cap switches
	"28": {
		"name": "METAL CAP COURSE",
		"id": "MC"
	},
	"29": {
		"name": "WING CAP",
		"id": "WC"
	},
	"18": {
		"name": "VANISH CAP",
		"id": "VC"
	},
	// bowser battles
	"30": {
		"name": "BOWSER FIRST BATTLE",
		"id": "B1"
	},
	"33": {
		"name": "BOWSER SECOND BATTLE",
		"id": "B2"
	},
	"34": {
		"name": "BOWSER THIRD BATTLE",
		"id": "B3"
	},
	// special stages
	"20": {
		"name": "SECRET AQUARIUM",
		"id": "S2"
	},
	"31": {
		"name": "RAINBOW CLOUDS",
		"id": "S1"
	},
	"25": {
		"name": "END CAKE PICTURE",
		"id": "S3"
	},
	"27": {
		"name": "PEACH SECRET SLIDE",
		"id": "PSS"
	}
};

let textTable = {
	"0": "0",
	"1": "1",
	"2": "2",
	"3": "3",
	"4": "4",
	"5": "5",
	"6": "6",
	"7": "7",
	"8": "8",
	"9": "9",
	"10": "A",
	"11": "B",
	"12": "C",
	"13": "D",
	"14": "E",
	"15": "F",
	"16": "G",
	"17": "H",
	"18": "I",
	"19": "J",
	"20": "K",
	"21": "L",
	"22": "M",
	"23": "N",
	"24": "O",
	"25": "P",
	"26": "Q",
	"27": "R",
	"28": "S",
	"29": "T",
	"30": "U",
	"31": "V",
	"32": "W",
	"33": "X",
	"34": "Y",
	"35": "Z",
	"36": "a",
	"37": "b",
	"38": "c",
	"39": "d",
	"40": "e",
	"41": "f",
	"42": "g",
	"43": "h",
	"44": "i",
	"45": "j",
	"46": "k",
	"47": "l",
	"48": "m",
	"49": "n",
	"50": "o",
	"51": "p",
	"52": "q",
	"53": "r",
	"54": "s",
	"55": "t",
	"56": "u",
	"57": "v",
	"58": "w",
	"59": "x",
	"60": "y",
	"61": "z",
	"62": "'",
	"63": ".",
	"80": "↑",
	"81": "↓",
	"82": "←",
	"83": "→",
	"84": "[A]",
	"85": "[B]",
	"86": "[C]",
	"87": "[Z]",
	"88": "[R]",
	"111": ",",
	"158": " ",
	"159": "-",
	"208": "/",
	"209": "[the]",
	"210": "[you]",
	"224": "{starsleft}",
	"225": "(",
	"226": ")(",
	"227": ")",
	"228": "+",
	"229": "&",
	"230": ":",
	"242": "!",
	"244": "?",
	"245": "”",
	"246": "“",
	"247": "~",
	"249": "$",
	"250": "★",
	"251": "[x]",
	"252": "[•]",
	"253": "☆",
	"254": "\n",
	"255": "[End]"
};

const starIDOffsets = {
    "OW":    8,
    "C1":    12,
    "C2":    13,
    "C3":    14,
    "C4":    15,
    "C5":    16,
    "C6":    17,
    "C7":    18,
    "C8":    19,
    "C9":    20,
    "C10":   21,
    "C11":   22,
    "C12":   23,
    "C13":   24,
    "C14":   25,
    "C15":   26,
    "B1":    27,
    "B2":    28,
    "B3":    29,
    "PSS":   30,
    "MC":    31,
    "WC":    32,
    "VC":    33,
    "S1":    34,
    "S2":    35,
    "S3":    36,
    "EX1":   37,
    "EX2":   38,
    "EX3":   39,
    "EX4":   40,
    "EX5":   41,
    "EX6":   42,
    "EX7":   43,
    "EX8":   44,
    "EX9":   45,
    "EX10":  46,
    "EX11":  47,
    "EX12":  48,
    "EX13":  49,
    "EX14":  50,
    "EX15":  51,
    "EXB1":  52,
    "EXB2":  53,
    "EXB3":  54,
    "EXPSS": 55,
    "EXMC":  56,
    "EXWC":  57,
    "EXVC":  58,
    "EXS1":  59,
    "EXS2":  60,
    "EXS3":  61,
    "EXS4":  62,
    "EXS5":  63,
    "EXS6":  64,
    "EXS7":  65,
    "EXS8":  66,
    "EXS9":  67,
    "EXS10": 68,
    "EXS11": 69,
    "EXS12": 70,
    "EXS13": 71,
    "EXS14": 72,
    "EXS15": 73
}

async function binFile(fileName, data) {
	await fs.writeFile("./bin/" + fileName, data);
}


function addStar(starID, stage, area, behaviorName, output, actMask) {
    let newStarID = starID % 8;
    let starType  = starID / 8 | 0;
    let outputID  = undefined;
    let tempMask  = 2 ** newStarID;

    if (starType == 0) { // local star ID : 0 to 7
        outputID = stage.id;
        if (starID == 7) console.log("valueless star yay! } :>  | ", (stage.name + "-" + area).padEnd(21, " "), " | ", starID, behaviorName);
    } else if (starType == 1) { // troll star ID : 8 to 15
        console.log("troll star wahoo :3       | ", (stage.name + "-" + area).padEnd(21, " "), " | ", starID, behaviorName);
        return; // do nothing
    } else { // globe star ID : 16 to 511
        console.log("implement global star IDs | ", (stage.name + "-" + area).padEnd(21, " "), " | ", starID, behaviorName);
        return;
    }

    output.romInfo.starTotal++;

    if (!output.stars[outputID]) {
        output.stars[outputID] = {
            starString: "00000000",
            starMask: 0,
            areas: {}
        }
    }

    let cat = output.stars[outputID];
    
    if ((cat.starMask | tempMask) != cat.starMask) output.romInfo.minUniqueGameStars++;

    cat.starMask   |= tempMask;
    cat.starString  = cat.starMask.toString(2).padStart(8,0).split("").reverse().join("");

    if (!output.stars[stage.id]) {
        output.stars[stage.id] = {
            starString: "00000000",
            starMask: 0,
            areas: {}
        }
    }


    let areaWithStar = output.stars[stage.id].areas;

    if (!areaWithStar[stage.name + "-" + area]) {
        areaWithStar[stage.name + "-" + area] = {
            starMasks: {},
            stars: []
        }
    }

    if (!areaWithStar[stage.name + "-" + area].starMasks[outputID]) {
        areaWithStar[stage.name + "-" + area].starMasks[outputID] = 0;
    }
    
    
    if ((areaWithStar[stage.name + "-" + area].starMasks[outputID] | tempMask) != areaWithStar[stage.name + "-" + area].starMasks[outputID]) output.romInfo.minUniqueAreaStars++;

    areaWithStar[stage.name + "-" + area].starMasks[outputID] |= tempMask;
    areaWithStar[stage.name + "-" + area].stars.push({
        source:    behaviorName,
		starID:    starID,
		starType:  starType,
		newStarID: newStarID,
        actMask:   actMask
    });
}

function bufferToNumber(buffer) {
	return parseInt(
		buffer.toString("hex"),
		16
	);
}

function stackPush(stack, nextCommandHead, head) {
	stack.push(nextCommandHead);
	return head;
}

async function getRomInfo(romDirectory) {
	let segments = {
		0x02: {
			start: 0x108A40,
			end:   0x114750
		},
		0x15: { // This one's a constant, no need to worry about it
			start: 0x2ABCA0,
			end:   0x2AC6B0
		}
	};
	let head = segments[0x15].start;
	let output = structuredClone(template);
	let stack = [];
	let stage, area;
	let currentEnd;
	let singleBuffer = Buffer.alloc(1, 0x01);
	let md5, crc32;
	
	await fs.readFile(romDirectory).then((rom) => {
		// hashing! done before shiftma since that slices up the rom
		md5   = crypto.createHash("md5").update(rom).digest("hex").toUpperCase();
		crc32 = crc.crc32(rom).toString(16).padStart(8, "0").toUpperCase();
		
		// Compile dialogue and general text
		function storeDialogue(head, maxSize) {
			let textOutput = {};
			let phrase = "";
			
			for (let i = 0, textIndex = 0; i < maxSize; i++) {
				let character = rom[head + i];
				
				if (textTable[character] == undefined) {
					// Definitely might not be needed.
					console.log(character);
				}
				
				if (character == 255) {
					textOutput[textIndex] = phrase;
					textIndex++;
					phrase = "";
				} else {
					phrase += textTable[character];
				}
			}
			
			return textOutput;
		}
		
		function arrayToText(input) {
			let objectOutput = {};
			let outputIndex = 0;
			
			for (let address of input) {
				let head = address["RomAddress"];
				let maxSize = address["MaxLength"];
				let phrase = "";
				
				for (let i = 0; i < maxSize; i++) {
					let character = rom[head + i];
					
					if (textTable[character] == undefined) {
						// Definitely might not be needed.
						console.log(character);
					}

					phrase += textTable[character];
				}
				
				objectOutput[outputIndex] = phrase;
				outputIndex++;
			}
			
			return objectOutput;
		}
		
		function arrayToAscii(input) {
			let objectOutput = {};
			let outputIndex = 0;
			
			for (let address of input) {
				let head = address["RomAddress"];
				let maxSize = address["MaxLength"];
				let phrase = "";
				
				for (let i = 0; i < maxSize; i++) {
					phrase += String.fromCharCode(rom[head + i]);
				}
				
				objectOutput[outputIndex] = phrase;
				outputIndex++;
			}
			
			return objectOutput;
		}
		
		let textLocations = require("./TextLocationList.json");
		
		output.text["fileMenu"] = arrayToText(textLocations["fileMenu"]);
		
		try { // Go code it yourself. }:>c
            console.log(head, head.toString(16));
			rom = require("./unshiftma.js")(rom, head, binFile);
		} catch {}
		
        // there's no star object for this, so *we* have to keep track of it
        let thiPiranhaPlantCount = 0;

		// Compile the basic level info. }:>
		while (true) {
			let nextCommandHead = head + rom[head + 1];
			let levelScriptCommand = rom.slice(head, nextCommandHead);
			
            console.log(head.toString(16), rom[head].toString(16), levelScriptCommand);

			if (levelScriptCommand.equals(singleBuffer)) {
				console.log("this rom can't be read!");
				return undefined;
			};
			
			// 2E loads collision and special objects, likely needed
			
			if (levelScriptCommand[0] == 0x17) {
				let segment = levelScriptCommand[3];
				let romStart = bufferToNumber(levelScriptCommand.slice(4, 8));
				let romEnd = bufferToNumber(levelScriptCommand.slice(8, 16));
				
				segments[segment] = {
					start: romStart,
					end: romEnd
				};
			} else if (levelScriptCommand[0] == 0x39) {
				let segment  = levelScriptCommand[4];
				let offset   = bufferToNumber(levelScriptCommand.slice(5, 8));
				let i        = 0;
				
				while (true) {
					let macroCMD = rom.slice(
						segments[segment].start + offset + 10 * i,
						segments[segment].start + offset + 10 * i + 10
					);
					let tempSlice = bufferToNumber(macroCMD.slice(0, 2));
					let macroX    = bufferToNumber(macroCMD.slice(2, 4));
					let macroY    = bufferToNumber(macroCMD.slice(4, 6));
					let macroZ    = bufferToNumber(macroCMD.slice(6, 8));
					let bparam1   = macroCMD[8];
					let bparam2   = macroCMD[9];
					let rotY      = tempSlice >> 9;
					let macroID   = tempSlice - (rotY << 9);
					
					if (macroID == 0x00 || macroID == 0x1E) {
						break;
					} else {
						// Since B3313 roms are based on US roms, this value is hardcoded.
						let macroPresetTableAddress = 0xEC7E0;
						let entryID   = macroID - 31;
						let objectCMD = rom.slice(
							macroPresetTableAddress + entryID * 8,
							macroPresetTableAddress + entryID * 8 + 8
						);
						let behavior = bufferToNumber(objectCMD.slice(0, 4));
						let behaviorName = "";

						for (let potentialBehavior of behaviorList) {
							if (potentialBehavior["Behavior"] == behavior) {
								behaviorName = potentialBehavior["Name"];
							}
						}
						
						// default bparam1/2 is byte 6/7
						
						stage.areas[area].objects.push({
							actMask:      undefined,
							objectID:     bufferToNumber(objectCMD.slice(4, 6)),
							xPosition:    macroX,
							yPosition:    macroY,
							zPosition:    macroZ,
							xRotation:    undefined,
							yRotation:    rotY,
							zRotation:    undefined,
							bparams:      [
								bparam1,
								bparam2,
								0,
								0
							],
							behavior:     behavior,
							behaviorName: behaviorName,
                            objectCMD: Array.from(objectCMD).map((b) => b.toString(16).padStart(2, "0")).join(""),
                            offset: head.toString(16)
						});
					}
					
					i++;
				}
			} else if (levelScriptCommand[0] == 0x1F) {
				output.romInfo.areaTotal += 1;
				area = levelScriptCommand[2];
				stage.areas[area] = {
					music: undefined,
					terrain: undefined,
					geometry: {
						rawInfo: [],
						background: undefined,
					},
					fast3D: {},
					stars: [],
					objects: [],
					warps: {},
					paintingWarps: {},
					instawarps: [],
					paintingObjects: [],
					warpsInOrder: [],
                    warpString: stage.name + " area " + area,
					availability: {
						here: stage.name + " area " + area,
						howToGetHere: [],
						placesToGo: [],
						depth: -1,
						accessible: false
					}
				};
                thiPiranhaPlantCount = 0;
				
				let geomHead = segments[levelScriptCommand[4]].start + bufferToNumber(levelScriptCommand.slice(5, 8));
				
				while (true) {
					// this can be re-written to be better
					let commandLength = (() => {
						if ( // channeling my inner yandere dev
							rom[geomHead] == 0x01 ||
							rom[geomHead] == 0x03 ||
							rom[geomHead] == 0x04 ||
							rom[geomHead] == 0x05 ||
							rom[geomHead] == 0x06 || // goes unused
							rom[geomHead] == 0x07 || // goes unused
							rom[geomHead] == 0x09 ||
							rom[geomHead] == 0x0B ||
							rom[geomHead] == 0x0C ||
							rom[geomHead] == 0x17 ||
							rom[geomHead] == 0x20
						) {
							return 4;
						} else if (
							rom[geomHead] == 0x00 ||
							rom[geomHead] == 0x02 ||
							rom[geomHead] == 0x0D ||
							rom[geomHead] == 0x0E ||
							rom[geomHead] == 0x16 ||
							rom[geomHead] == 0x18 ||
							rom[geomHead] == 0x1A || // nop
							rom[geomHead] == 0x1E ||
							(rom[geomHead] == 0x0A && rom[geomHead + 1] == 0x00) || // special case 
							(rom[geomHead] == 0x11 && rom[geomHead + 1] >> 4 != 0x08) || // special case 
							(rom[geomHead] == 0x12 && rom[geomHead + 1] >> 4 != 0x08) || // special case
							(rom[geomHead] == 0x14 && rom[geomHead + 1] >> 4 != 0x08) // special case
						) {
							return 8;
						} else if (rom[geomHead] == 0x15) {
							let geomCMD = rom.slice(geomHead, geomHead + 8);
							let layer = geomCMD[1];
							let segment = geomCMD[4];
							let offset = bufferToNumber(geomCMD.slice(5, 8));
							let address;
							
							if (segment == 0xE) {
								// this implementation is actually cursed
								let segData = segments[0x19].start + 0x5F00 + area * 0x10;
								address = bufferToNumber(rom.slice(segData, segData + 4)) + offset;
							} else {
								address = segments[segment].start + offset;
							}
							
							stage.areas[area].fast3D[layer] = "";
							
							if (rom.slice(address, address + 8).toString("hex") != "e700000000000000") {
								console.log("uncompress mio0");
							}

							while (true) {
								let fCommand = rom.slice(address, address + 8);
								
								//stage.areas[area].fast3D += fCommand.toString("hex");
								
								switch (fCommand[0]) {
									case 0x04:
										let vertCount = (fCommand[1] >> 4) + 1;
										
										stage.areas[area].fast3D[layer] += vertCount.toString(16);
										/*
										//console.log("VERT COUNT: ", fCommand[1].toString(16), vertCount);
										
										// Each vertex is 12CMDs long, assumedly XXXYYZZZRGBA
										let addy = segments[fCommand[4]].start + bufferToNumber(fCommand.slice(5, 8));
										
										for (let i = 0; i < vertCount; i++) {
											stage.areas[area].fast3D += rom.slice(addy + 12 * (i), addy + 12 * (i + 1) - 8).toString("hex")
										}
										//console.log(rom.slice(addy, addy + 12 * vertCount));
										break;*/
									case 0xBF:/*
										let vert1 = fCommand[5] / 0xA;
										let vert2 = fCommand[6] / 0xA;
										let vert3 = fCommand[7] / 0xA;
										
										//console.log(fCommand.slice(5, 8), vert1, vert2, vert3);
										
										stage.areas[area].fast3D += vert1.toString(16) + vert2.toString(16) + vert3.toString(16)*/
								}
								
								if (fCommand[0] == 0xB8) {
									break;
								}
								

								if (fCommand[0] == 0x03) {
                                    let index =     fCommand[1];
                                    let size =      fCommand.slice(2, 4);
                                    let segment =   fCommand[4];
                                    let addr =      fCommand[5] << 16 | fCommand[6] << 8 | fCommand[7];
                                    let jumpTo = segments[segment].start + addr;
                                    
                                    if (index == 0x86 || index == 0x88) { // diffuse light
                                        //console.log(fCommand, segment, addr.toString(16).padStart(6, 0), jumpTo);
                                        if (index == 0x86) { // diffuse
                                            //console.log("DIFFUSE", rom.slice(jumpTo, jumpTo + 16));
                                        }

                                        if (index == 0x88) { //ambient light
                                            //console.log("AMBIENT", rom.slice(jumpTo, jumpTo + 8));
                                        }
                                    }
								}
								
								if (fCommand[0] == 0xF8) {
                                    stage.areas[area].fogColor = `#${fCommand[4].toString(16).padStart(2,0)}${fCommand[5].toString(16).padStart(2,0)}${fCommand[6].toString(16).padStart(2,0)}${fCommand[7].toString(16).padStart(2,0)}`;
								}

								address += 8;
							}
							return 8;
						} else if (rom[geomHead] == 0x19) {
							let geomCmd = rom.slice(geomHead, geomHead + 8);
							
							stage.areas[area].geometry.background = bufferToNumber(geomCmd.slice(2, 4));
							return 8;
						} else if (
							rom[geomHead] == 0x08 ||
							rom[geomHead] == 0x13 ||
							(rom[geomHead] == 0x0A && rom[geomHead + 1] != 0x00) || // special case 
							(rom[geomHead] == 0x11 && rom[geomHead + 1] >> 4 == 0x08) || // special case
							(rom[geomHead] == 0x12 && rom[geomHead + 1] >> 4 == 0x08) || // special case
							(rom[geomHead] == 0x14 && rom[geomHead + 1] >> 4 == 0x08) // special case
						) {
							return 0x0C;
						} else if (rom[geomHead] == 0x0F) {
							return 0x14;
						} else if (
							rom[geomHead] == 0x10 ||
							rom[geomHead] == 0x1F
						) {
							return 0x10;
						} else if (rom[geomHead] == 0x1D) { // cmdlet 1D is unset cus reasons
							console.log("implement cmdlet 0x1D or die xd");
						} else {
							console.log("i am 50 cent", h(rom[geomHead]), word);
						}
						//cmdlet 0A 11 12 14 1D are special cases
					})();
					
					let geomCmd = rom.slice(geomHead, geomHead + commandLength);
						
					stage.areas[area].geometry.rawInfo.push(
						geomCmd.toString("hex")
					);
					
					if (rom[geomHead] == 0x01) break;
					
					geomHead += commandLength;
				}
			} else if (levelScriptCommand[0] == 0x24) {
				let behaviorName = "";
				let behavior = bufferToNumber(levelScriptCommand.slice(20, 24));
				let bparams = [
					levelScriptCommand[16],
					levelScriptCommand[17],
					levelScriptCommand[18],
					levelScriptCommand[19]
				];
				
				for (let potentialBehavior of behaviorList) {
					if (potentialBehavior["Behavior"] == behavior) {
                        let starID = bparams[0]/* + (bparams[2] << 8 & 0x100)*/;
						behaviorName = potentialBehavior["Name"];
                        actMask = levelScriptCommand[2];

						// TO-DO: add behavior for custom objects
                        //        remove star if it's not in act 0 or 1
                        switch (behaviorName) {
                            case "Koopa":
                                // only add star if it's Koopa the Quick
                                if (bparams[1] == 2 || bparams[1] == 3) {
                                    addStar(starID, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                            case "Klepto":
                                // only add star if it's a Star-Holding Klepto
                                if (bparams[1] == 1) {
                                    addStar(starID, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                            case "Mr. I (grouped object)":
                                // only add star if it's Boss I
                                if (bparams[1] == 1) {
                                    addStar(starID, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                            case "[!] Box": // there are bugs with content IDs
                                // no guaruntee this'll work past 0.7, but it's a start
                                if (bparams[1] == 8 || (bparams[1] > 9 && bparams[1] < 15)) {
                                    // is this how it actually works?? mwei
                                    if (bparams[0] == 0) starID = [8, 10, 11, 12, 13, 14].indexOf(bparams[1]);
                                    addStar(starID, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                            case "MIPS the Rabbit":
                                // hardcoding these values is pretty dangerous!
                                addStar(3, stage, area, potentialBehavior["Name"], output, actMask);
                                addStar(4, stage, area, potentialBehavior["Name"], output, actMask);
                                break;
                            case "Toad":
                                // toadstradamus function
                                // in vanilla, stars from toad are #76, #82, and #83
                                starID = [82, 76, 83].indexOf(bparams[0]);
                                if (starID > -1) {
                                    addStar(starID, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                            case "Piranha Plant (THI, Sizeable)":
                                /*if (bparams[1] == 1)*/ thiPiranhaPlantCount++;
                                if (thiPiranhaPlantCount == 5) {
                                    addStar(0, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                            case "TOP star spawn bhv killed":
                                //console.log("TOP star spawn bhv killed", stage.name, area, bparams[0]);
                                addStar(bparams[0], stage, area, potentialBehavior["Name"], output, actMask);
                                break;
                            case "Deathtimer":
                                if (bparams[2] == 1 || bparams[2] == 2) {
                                    //console.log("Deathtimer", stage.name, area, bparams[2], bparams[3]);
                                    addStar(bparams[3], stage, area, potentialBehavior["Name"], output, actMask);
                                } else //console.log("Deathtimer (no star)", stage.name, area);
                                break;
                            default:
                                if (potentialBehavior["BP1 Name"] == "Star ID") {
                                    addStar(starID, stage, area, potentialBehavior["Name"], output, actMask);
                                }
                                break;
                        }
					}
				}
				
				if (behaviorName == "ai object") {
					stage.areas[area].aiInfo = {
						hud: [
							"NO OBJ", "NORMAL", "B ROLL", "SHOSHINKAI", "E3", "DECEMBER"
						][bparams[0] + 1],
						terrain: [
							"NO OBJ", "CAVE", "LAVA", "GRASS", "STONE", "SNOW", "SAND", "SPOOKY", "WATER", "SLIDE"
						][bparams[1] + 1],
						nightTypes: [
							"NO OBJ", "RTC OR DAY", "RTC OR NIGHT", "FLIP RTC OR DAY", "FLIP RTC OR NIGHT", "DAY", "NIGHT"
						][bparams[2] + 1],
						disableDisplayListTroll: bparams[3] & 0x01,
						disableObjectListTroll:  bparams[3] & 0x02,
						disableDiscoloration:    bparams[3] & 0x04,
						disableLevelScale:       bparams[3] & 0x08,
						enableToxicGas:          bparams[3] & 0x10,
						loadRedStar:             bparams[3] & 0x20,
						hueShiftStar:            bparams[3] & 0x40,
						disableFastTravel:       bparams[3] & 0x80
					};
				}
				
				if (behaviorName == "music mangler") {
					stage.areas[area].musicMangler = {
						transposition:  bparams[0], // 0x77 [119] is default
						tempo:          bparams[1],
						nlstAtDay:      bparams[2],
						nlstAtNight:    bparams[3]
					};
				}
				
				if (behaviorName == "painting object") {
					stage.areas[area].paintingObjects.push({
						mainWarp: 	bparams[1],
						altWarp:    bparams[3]
					});
				}
				
                console.log(stage, area);

				stage.areas[area].objects.push({
					actMask:      actMask,
					objectID:     levelScriptCommand[3],
					xPosition:    bufferToNumber(levelScriptCommand.slice(4, 6)),
					yPosition:    bufferToNumber(levelScriptCommand.slice(6, 8)),
					zPosition:    bufferToNumber(levelScriptCommand.slice(8, 10)),
					xRotation:    bufferToNumber(levelScriptCommand.slice(10, 12)),
					yRotation:    bufferToNumber(levelScriptCommand.slice(12, 14)),
					zRotation:    bufferToNumber(levelScriptCommand.slice(14, 16)),
					bparams:      bparams,
					behavior:     behavior,
					behaviorName: behaviorName,
                    objectCMD: Array.from(levelScriptCommand).map((b) => b.toString(16).padStart(2, "0")).join(""),
                    offset: head.toString(16)
				});
			} else if (levelScriptCommand[0] == 0x26) {
				stage.areas[area].warps[levelScriptCommand[2]] = {
					stage:      levelScriptCommand[3],
					area:       levelScriptCommand[4],
					warpID:     levelScriptCommand[5],
					checkpoint: levelScriptCommand[6] == 0x80
				};
				stage.areas[area].warpsInOrder.push({
					index:      levelScriptCommand[2],
					stage:      template[levelScriptCommand[3]].name + "-" + levelScriptCommand[4],
					area:       levelScriptCommand[4],
					warpID:     levelScriptCommand[5],
					checkpoint: levelScriptCommand[6] == 0x80
				});
                stage.areas[area].warpString += `\n${("" + levelScriptCommand[2]).padStart(3, " ")} : ${
                    (template[levelScriptCommand[3]].name + "-" + levelScriptCommand[4]).padStart(22, " ")
            } : ${levelScriptCommand[5]}`;
			} else if (levelScriptCommand[0] == 0x27) {
				stage.areas[area].paintingWarps[levelScriptCommand[2]] = {
					stage:      levelScriptCommand[3],
					area:       levelScriptCommand[4],
					warpID:     levelScriptCommand[5],
					checkpoint: levelScriptCommand[6] == 0x80
				};
			} else if (levelScriptCommand[0] == 0x28) {
				let segment = levelScriptCommand[3];
				let romStart = bufferToNumber(levelScriptCommand.slice(4, 8));
				let romEnd = bufferToNumber(levelScriptCommand.slice(8, 16));
				
				stage.areas[area].instawarps.push({
					collision:   levelScriptCommand[2],
					destination: levelScriptCommand[3],
					x:           bufferToNumber(levelScriptCommand.slice(4, 6)),
					y:           bufferToNumber(levelScriptCommand.slice(6, 8)),
					z:           bufferToNumber(levelScriptCommand.slice(8, 10))
				});
			} else if (levelScriptCommand[0] == 0x36) {
				stage.areas[area].music = levelScriptCommand[5];
			} else if (levelScriptCommand[0] == 0x31) {
				stage.areas[area].terrain = [
					"Normal [0x00]",
					"Normal [0x01]",
					"Snow [0x02]",
					"Sand [0x03]",
					"Haunted House [0x04]",
					"Water Levels [0x05]",
					"Slippery Slide [0x06]"
				][levelScriptCommand[3]];
			} else if (levelScriptCommand[0] == 0x2E) {
				// collision and special objects loaded here, too bored to implement it properly
				let segment = levelScriptCommand[4];
				let offset  = levelScriptCommand.slice(5, 8);
			}
			
			// These commands are placed separately due to modifying the head
			if (levelScriptCommand[0] == 0x06) {
				let segment = levelScriptCommand[4];
				
				// Ensures that if a segment isn't loaded, the jump isn't made
				if (segments[segment]) {
                    //console.log(segment.toString(16))
					let jumpTo = bufferToNumber(levelScriptCommand.slice(5, 8));
					head = stackPush(stack, nextCommandHead, segments[segment].start + jumpTo);
				} else {
					head = nextCommandHead;
				}
			} else if (levelScriptCommand[0] == 0x0C) {
				// Normally this is a conditional jump, but we need to check every course
				let segment = levelScriptCommand[8];
				let jumpTo = bufferToNumber(levelScriptCommand.slice(9, 12));
				
				head = stackPush(stack, nextCommandHead, segments[segment].start + jumpTo);
				stage = output[levelScriptCommand[7]];
				stage.areas = {};
			} else if (levelScriptCommand[0] == 0x02) {
				if (stack.length == 1) break;
				head = stack.pop();
			} else if (levelScriptCommand[0] == 0x07) {
				head = stack.pop();
			} else if (levelScriptCommand[0] == 0x00) {
				let segment = levelScriptCommand[3];

				// segment 0x14 loads the star select, we don't need to do that
				if (segment != 0x14) {
					let romStart = 		bufferToNumber(levelScriptCommand.slice(4, 8));
					let romEnd = 		bufferToNumber(levelScriptCommand.slice(8, 12));
					let jumpTarget = 	levelScriptCommand[12]; // same as segment, but i care :3
					let jumpTo = 		bufferToNumber(levelScriptCommand.slice(13, 16));
					
					currentEnd = romEnd;
					
					segments[segment] = {
						start: romStart,
						end: romEnd
					};
					
					head = stackPush(stack, nextCommandHead, segments[jumpTarget].start + jumpTo);
				} else {
					head = nextCommandHead;
				}
			} else {
				head = nextCommandHead;
			}
		}
		

		output.text["dialogue"]   = storeDialogue(8433290, 33428);
		output.text["levelNames"] = storeDialogue(8470122, 595);
		output.text["actNames"]   = storeDialogue(8470826, 2389);
		output.text["endingText"] = storeDialogue(967932,  232);
		
		output.text["credits"] = arrayToAscii(textLocations["credits"]);
		
		// Compile area accessibility
		// set to THI-1 since every bee version starts there
		output[13].areas[1].availability.depth = 0;
		output[13].areas[1].availability.accessible = true;
		let stageList = [{
			stage: 13,
			area: 1
		}];
	  
		function findWarpEntrance(object) {
			return 	(!object.behaviorName.includes("Warp (Mario Start ") &&
			        !object.behaviorName.includes("Warp (Level Exit") &&
			        object.behaviorName.toLowerCase().includes("warp")) ||
			        object.behavior == 0x13002710 || // boo buddy with cage
			        object.behavior == 0x13005750; // bbh warp object
			        object.behavior == 520157184; // painting object
		}

		function findWarpExit(object) {
			return object.behaviorName.toLowerCase().includes("warp");
		}
		
		function handleSpecialWarp(currentArea, here, warp, warpType) {
			let possibleWarp = currentArea.warps[warp];

			if (possibleWarp) {
				let warpTextAppendix = " [" + warpType + " warp]";
				currentArea.availability.placesToGo.push(
					output[possibleWarp.stage].name + " area " + possibleWarp.area + " (" + possibleWarp.stage + "-" + possibleWarp.area + ")" + warpTextAppendix
				);/*
				
				let destination = output[possibleWarp.stage].areas[possibleWarp.area];
				let hereSuccess = here + warpTextAppendix;
				
				if (!destination.availability.howToGetHere.includes(hereSuccess)) {
					destination.availability.howToGetHere.push(hereSuccess);
					
					if (destination.availability.depth == -1) {
						destination.availability.depth = currentArea.availability.depth + 1;
						destination.availability.accessible = true;
						
						stageList.push({
							stage: possibleWarp.stage,
							area:  possibleWarp.area
						});
					}
				}*/
			}
		}
		
		for (let stageSet of stageList) {
			let stage = stageSet.stage;
			let area  = stageSet.area;
			
			let currentArea = output[stage].areas[area];
			let here = output[stage].name + " area " + area + " (" + stage + "-" + area + ")";
			
			// handle normal warps
			for (let object of currentArea.objects) {
				if (findWarpEntrance(object)) {
					let possibleWarp = currentArea.warps[object.bparams[1]];
					
					if (possibleWarp) {
						let destination = output[possibleWarp.stage].areas[possibleWarp.area];
						
						if (destination) {
							for (let warpExit of destination.objects) {
								if (findWarpExit(warpExit) && possibleWarp.warpID == warpExit.bparams[1]) {
									let there = output[possibleWarp.stage].name + " area " + possibleWarp.area + " (" + possibleWarp.stage + "-" + possibleWarp.area + ")";
									
									if (!currentArea.availability.placesToGo.includes(there)) {
										currentArea.availability.placesToGo.push(there);
									}
									
									if (!destination.availability.howToGetHere.includes(here)) {
										destination.availability.howToGetHere.push(here);
										
										if (destination.availability.depth == -1) {
											destination.availability.depth = currentArea.availability.depth + 1;
											destination.availability.accessible = true;
											
											stageList.push({
												stage: possibleWarp.stage,
												area:  possibleWarp.area
											});
										}
									}
								}
							}
						}
					}
				}
				
				// handle painting warps
				for (let index in currentArea.paintingWarps) {
					let warp = currentArea.paintingWarps[index];
					let destination = output[warp.stage].areas[warp.area];
					
					if (destination) {
						for (let warpExit of destination.objects) {
							if (findWarpExit(warpExit) && warp.warpID == warpExit.bparams[1]) {
								let there = output[warp.stage].name + " area " + warp.area + " (" + warp.stage + "-" + warp.area + ") [painting]";
									
								if (!currentArea.availability.placesToGo.includes(there)) {
									currentArea.availability.placesToGo.push(there);
								}
								
								if (!destination.availability.howToGetHere.includes(here + " [painting]")) {
									destination.availability.howToGetHere.push(here + " [painting]");
									
									if (destination.availability.depth == -1) {
										destination.availability.depth = currentArea.availability.depth + 1;
										destination.availability.accessible = true;
										
										stageList.push({
											stage: warp.stage,
											area:  warp.area
										});
									}
								}
							}
						}
					}
				}
				
				// TO-DO: add custom paintings [obj 0x1F00F800]
			}
			
			// handle special warps
			// only works if the area has stars, perhaps rework this
			handleSpecialWarp(currentArea, here, 240, "success");
			handleSpecialWarp(currentArea, here, 241, "failure");
			handleSpecialWarp(currentArea, here, 242, "special");
			handleSpecialWarp(currentArea, here, 243, "special");
			
			// handle instawarps
			for (let instawarp of currentArea.instawarps) {
				let instaHere = here + " [instawarp]"
				let destination = output[stage].areas[instawarp.destination];
				let there = output[stage].name + " area " + instawarp.destination + " (" + stage + "-" + instawarp.destination + ") [instawarp]";
				
				if (!currentArea.availability.placesToGo.includes(there)) {
					currentArea.availability.placesToGo.push(there);
				}
				
				if (destination && !destination.availability.howToGetHere.includes(instaHere)) {
					destination.availability.howToGetHere.push(instaHere);
					
					if (destination.availability.depth == -1) {
						destination.availability.depth = currentArea.availability.depth + 1;
						destination.availability.accessible = true;

						stageList.push({
							stage: stage,
							area:  instawarp.destination
						});
					}
				}
			}
		}

        // loop through stars and account for 100 coins
        let potential100CoinStars = 15;

        for (let area in output.stars) {
            if (area[0] == "C") {
                let course = output.stars[area];
                if (course && course.starString[6] == 1) potential100CoinStars--;
                else if (course) {
                    //console.log(area);
                    course.starMask |= 2 ** 6;
                } else {
                    //console.log(output.stars[area]);
                    output.stars[area] = {
                        starMask: 2 ** 6
                    }
                }
            }
        }

        output.romInfo.maxUniqueAreaStars = output.romInfo.minUniqueAreaStars + potential100CoinStars;
        output.romInfo.maxUniqueGameStars = output.romInfo.minUniqueGameStars + potential100CoinStars;
		
		// rom version
		version = rom.slice(0x1201FF8, 0x1202000);
		output.romInfo.version = version.slice(0, 4).toString("hex") + " " + version[4] + "." + version[5] + "." + version[6] + " revision " + version[7];

        // rom header
        romName = rom.slice(0x20, 0x34).toString();
        output.romInfo.name = romName;

		// TO-DO: implement music reader
		// TO-DO: implement area accessibility
	});
	
	return [output, md5, crc32, version, romName];
}

function makeLayouts(starList, basicStarAmount, complexStarAmount, name) {
    let basicLayout = {
        header: `// B3313
// layout auto-generated by bife (〃￣ω￣〃ゞ
`,
        courseDescription: `{
    "courseDescription":[`,
        secretDescription: `
    ],
    "secretDescription":[`,
        footer: `
    ],
    "goldStar":"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAALpQTFRFR3BM/v+MLyoBUEQK/uc+eF8CZUsE/+9FVj0DPzAB9NEjKx4AaVIB//ZQsaFL/v9+9eBmRjoB/tw5upsI/ucz//1x//+3/+5ROikAAgIA9+JF8tVMya0xSTQE/v/N/f+p4c1LcWgsIRgAh3k4WUoEza4O5sET/vVm58kw179W//6d/d8slX8S//pch2kB17MGtqIpXVUjh3Ulo4QAqY0M17gs2c9ooo47lXMB/+86FBIJ//7v/PJ7z7xkbX0lxQAAAAF0Uk5TAEDm2GYAAAGxSURBVHjarZPZbqMwAEVtvANmCTuBBBICZF+aven//9Y41aihIxXNQ+8T6B4duLIMfj27YX9/ydZ2Xz+9FCGEfcD88R72AKXlwNH7GPYIYGCPRoseQRBJOPpRMf0IIsZk+JPCspw1i2RkjxaNA17Jsux0aouiGDpQMrmWMnw4zvAzaQTAwZo7TmDbdtM0wSWLZDFtgvUDQhiG6m8CMBHVxmsHGDOV+57J/T1VT7cb9nVvRSi4TwxDkJmuK6ZNJoyJJMMML5f1CnHKBQATQxMx9zxFpEmCfZHsGNZnM8pNonoM/iNKIfL8rR6kiTEYVEmqvo4QJwTFHULEGWOo9P2VxuQJUUpMt+MwhDg0DA/UlrS9sbFFur3KpCzPkVqH/c/BQXg+U9DN3rKcVNXLeqs/kcX4nxMr5x+pv9TrI+VvW32J12G4+C4oCl2vPcopzxVS+7b9TVFabTtbcU4JqZBCrlvGYBeY7q7XZ70hruaiCuX58RjZrx4dCOfmZvOcpmnCrSjnfCWDF2AqNzGrv8u12EWmaXrRF5BzipArvt41pRHIzDqHocUx6EYxRkx/5zb/Aa9RJ+CTR/1wAAAAAElFTkSuQmCC",
    "darkStar":"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAABhQTFRFR3BMcHBwAAAAZWVlW1tbSkpKNjY2IiIiudkYlgAAAAF0Uk5TAEDm2GYAAAC/SURBVHjarZNLjsQgDAXx+9j3v/EoyVgQWqI3XdkEqoQXiPFzSl98Mk4e5YhTgeQxQCniVCDj5nQAeSiQ5CmoUgfUmOSFLxR8Ckq2bEnX4LQYEby+LqLhAICyJO7IBWDgJu01kSTjZvwXVWshZbb/HnQC63Y9vf0sUmxy6qWYnlHtm56gCzLCxnZPpVs7JenzQvAIF4C0tAcoW87CQ3ovkHZiIcl3UNioYix+svwzPoPXsrgH+zpHM/V76zev+Q87ZAX22yKKawAAAABJRU5ErkJggg==",
    "starAmount":${basicStarAmount},
    "starsShown":8
}`
    };

    // use a different layout if 
    basicLayout.courseDescription += ``;

    basicLayout.secretDescription += ``;

    let ids = Object.keys(starList);
    let owExists = false;

    for (let i = 0; i < ids.length; i++) {
        if (ids[i] == "OW") owExists = true;
        else {
            let id = ids[i];
            let course = starList[id];

            if (course) {
                basicLayout.courseDescription += `\n        {"text":"${id}","starMask":${course.starMask},"offset":${starIDOffsets[id]},"Type":1},`;
            }
        }
    }

    if (owExists) basicLayout.courseDescription += `\n        {"text":"OW","starMask":${starList["OW"].starMask},"offset":8,"Type":1},`;

    binFile(`./layouts/${name} basic.jsml`, basicLayout.header + basicLayout.courseDescription + basicLayout.secretDescription + basicLayout.footer);

    let complexLayout = {
        header: `// B3313
// layout auto-generated by bife (〃￣ω￣〃ゞ
`,
        courseDescription: `{
    "courseDescription":[`,
        secretDescription: `
    ],
    "secretDescription":[`,
        footer: `
    ],
    "goldStar":"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAALpQTFRFR3BM/v+MLyoBUEQK/uc+eF8CZUsE/+9FVj0DPzAB9NEjKx4AaVIB//ZQsaFL/v9+9eBmRjoB/tw5upsI/ucz//1x//+3/+5ROikAAgIA9+JF8tVMya0xSTQE/v/N/f+p4c1LcWgsIRgAh3k4WUoEza4O5sET/vVm58kw179W//6d/d8slX8S//pch2kB17MGtqIpXVUjh3Ulo4QAqY0M17gs2c9ooo47lXMB/+86FBIJ//7v/PJ7z7xkbX0lxQAAAAF0Uk5TAEDm2GYAAAGxSURBVHjarZPZbqMwAEVtvANmCTuBBBICZF+aven//9Y41aihIxXNQ+8T6B4duLIMfj27YX9/ydZ2Xz+9FCGEfcD88R72AKXlwNH7GPYIYGCPRoseQRBJOPpRMf0IIsZk+JPCspw1i2RkjxaNA17Jsux0aouiGDpQMrmWMnw4zvAzaQTAwZo7TmDbdtM0wSWLZDFtgvUDQhiG6m8CMBHVxmsHGDOV+57J/T1VT7cb9nVvRSi4TwxDkJmuK6ZNJoyJJMMML5f1CnHKBQATQxMx9zxFpEmCfZHsGNZnM8pNonoM/iNKIfL8rR6kiTEYVEmqvo4QJwTFHULEGWOo9P2VxuQJUUpMt+MwhDg0DA/UlrS9sbFFur3KpCzPkVqH/c/BQXg+U9DN3rKcVNXLeqs/kcX4nxMr5x+pv9TrI+VvW32J12G4+C4oCl2vPcopzxVS+7b9TVFabTtbcU4JqZBCrlvGYBeY7q7XZ70hruaiCuX58RjZrx4dCOfmZvOcpmnCrSjnfCWDF2AqNzGrv8u12EWmaXrRF5BzipArvt41pRHIzDqHocUx6EYxRkx/5zb/Aa9RJ+CTR/1wAAAAAElFTkSuQmCC",
    "darkStar":"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAABhQTFRFR3BMcHBwAAAAZWVlW1tbSkpKNjY2IiIiudkYlgAAAAF0Uk5TAEDm2GYAAAC/SURBVHjarZNLjsQgDAXx+9j3v/EoyVgQWqI3XdkEqoQXiPFzSl98Mk4e5YhTgeQxQCniVCDj5nQAeSiQ5CmoUgfUmOSFLxR8Ckq2bEnX4LQYEby+LqLhAICyJO7IBWDgJu01kSTjZvwXVWshZbb/HnQC63Y9vf0sUmxy6qWYnlHtm56gCzLCxnZPpVs7JenzQvAIF4C0tAcoW87CQ3ovkHZiIcl3UNioYix+svwzPoPXsrgH+zpHM/V76zev+Q87ZAX22yKKawAAAABJRU5ErkJggg==",
    "starAmount":${complexStarAmount},
    "starsShown":8
}`
    };

    let left = true;
    for (let courseID in starList) {
        if (starList[courseID]) {
            let course = starList[courseID];

            for (let areaID in course.areas) {
                let area = course.areas[areaID];

                if (left) complexLayout.courseDescription += `\n        {"text":"${areaID}","Type":2},`;
                else complexLayout.secretDescription += `\n        {"text":"${areaID}","Type":2},`;

                for (let starID in area.starMasks) {
                    if (left) complexLayout.courseDescription += `\n        {"text":"","starMask":${area.starMasks[starID]},"offset":${starIDOffsets[starID]},"Type":1},`;
                    else complexLayout.secretDescription += `\n        {"text":"","starMask":${area.starMasks[starID]},"offset":${starIDOffsets[starID]},"Type":1},`;
                }

                left = !left;
            }
        }
    }

    // delete the hanging commas
    complexLayout.courseDescription = complexLayout.courseDescription.slice(0, -1);
    complexLayout.secretDescription = complexLayout.secretDescription.slice(0, -1);

    binFile(`./layouts/${name} complex.jsml`, complexLayout.header + complexLayout.courseDescription + complexLayout.secretDescription + complexLayout.footer);
}

async function checkForDirectory(dir) {
	try {
		await fs.access(dir);	
	} catch {
		await fs.mkdir(dir);
	}
}

(async function() {
	checkForDirectory("./bin/");
	checkForDirectory("./bin/changes/");
	checkForDirectory("./bin/json/");
	
	if (process.argv[2].split(".").pop() == "bps") {
		console.log("bps file type!");

		await fs.readFile(process.argv[2]).then((bps) => {
			let patchMD5       = crypto.createHash("md5").update(bps).digest("hex").toUpperCase();
			let sourceChecksum = bps.slice(bps.length - 12, bps.length - 8).reverse().toString("hex").toUpperCase();
			let targetChecksum = bps.slice(bps.length - 8,  bps.length - 4).reverse().toString("hex").toUpperCase();
			let patchChecksum  = bps.slice(bps.length - 4,  bps.length    ).reverse().toString("hex").toUpperCase();
			
			console.log("Source Checksum :", sourceChecksum,
				sourceChecksum == "3CE60709" ? "(Mario 64's Checksum)" : ""
			);
			console.log("Target Checksum :", targetChecksum);
			console.log("Patch  Checksum :", patchChecksum);
			console.log("Patch  MD5      :", patchMD5);
		});

		return;
	}
	
	let [rom1, firstMD5, firstCRC32, firstVersion] = await getRomInfo(process.argv[2]);
	if (rom1 == undefined) return;
	await binFile("./json/rom1.json", JSON.stringify(rom1));
	console.log("Rom 1 NAME :", rom1.romInfo.name);
	console.log("Rom 1 VER  :", 
		firstVersion.slice(0, 4).toString("hex"),
		firstVersion[4] + "." + firstVersion[5] + "." + firstVersion[6], "revision " + firstVersion[7]
	);
	console.log("Rom 1 MD5  :", firstMD5);
	console.log("Rom 1 CRC32:", firstCRC32);
	
    makeLayouts(rom1.stars, rom1.romInfo.minUniqueGameStars, rom1.romInfo.minUniqueAreaStars, rom1.romInfo.name.trim());

	if (process.argv[3]) {
		let [rom2, secondMD5, secondCRC32, secondVersion] = await getRomInfo(process.argv[3]);
		if (rom2 == undefined) return;
		await binFile("./json/rom2.json", JSON.stringify(rom2));
		console.log();
    	console.log("Rom 2 NAME :", rom2.romInfo.name);
		console.log("Rom 2 VER  :",
			secondVersion.slice(0, 4).toString("hex"),
			secondVersion[4] + "." + secondVersion[5] + "." + secondVersion[6], "revision " + secondVersion[7]
		);
		console.log("Rom 2 MD5  :", secondMD5);
		console.log("Rom 2 CRC32:", secondCRC32);
		
		let changes = {
			details: {
				additions: "",
				removals: "",
				objectChanges: "",
				geometryChanges: "",
				fast3DChanges: "",
				dialogueChanges: "",
				levelNamesChanges: "",
				actNamesChanges: "",
				endingTextChanges: "",
				fileMenuChanges: "",
				creditsChanges: "",
				warpChanges: ""
			},
			additions: 0,
			removals: 0,
			objectChanges: 0,
			geometryChanges: 0,
			fast3DChanges: 0,
			dialogueChanges: 0,
			levelNamesChanges: 0,
			actNamesChanges: 0,
			endingTextChanges: 0,
			fileMenuChanges: 0,
			creditsChanges: 0,
			warpChanges: 0
		};
		
		for (let stage of order) {
			let rom1Stage = rom1[stage];
			let rom2Stage = rom2[stage];
			
			for (let area of [...new Set([...Object.keys(rom1Stage.areas), ...Object.keys(rom2Stage.areas)])]) {
				if (rom1Stage.areas[area] && !rom2Stage.areas[area]) {
					changes.details.removals += template[stage].name + " area " + area + " was removed!\n";
					changes.removals += 1;
				} else if (!rom1Stage.areas[area] && rom2Stage.areas[area]) {
					changes.details.additions += template[stage].name + " area " + area + " was added!\n";
					changes.additions += 1;
				} else {
					if (JSON.stringify(rom1Stage.areas[area].objects) != JSON.stringify(rom2Stage.areas[area].objects)) {
						changes.details.objectChanges += template[stage].name + " area " + area + " had its objects changed!\n";
						changes.objectChanges += 1;
					}
					
					
					if (JSON.stringify(rom1Stage.areas[area].geometry.rawInfo) != JSON.stringify(rom2Stage.areas[area].geometry.rawInfo)) {
						changes.details.geometryChanges += template[stage].name + " area " + area + " had its geometry changed!\n";
						changes.geometryChanges += 1;
					}
					
					let fast3DToggle = true;
					let fast3DUsedLayers = [];
					let fast3DIncrement = false;
					
					for (let layer of [...new Set([...Object.keys(rom1Stage.areas[area].fast3D), ...Object.keys(rom2Stage.areas[area].fast3D)])]) {
						if (rom1Stage.areas[area].fast3D[layer] != rom2Stage.areas[area].fast3D[layer]) {
							if (fast3DToggle) {
								if (Object.keys(rom1Stage.areas[area].fast3D).toString() != Object.keys(rom2Stage.areas[area].fast3D).toString()) {
									changes.details.fast3DChanges += template[stage].name + " area " + area + " has a changed layer count! " + 
									Object.keys(rom1Stage.areas[area].fast3D).toString() + " -> " + Object.keys(rom2Stage.areas[area].fast3D).toString() + "\n";
									
									fast3DIncrement = true;
								}
								
								fast3DToggle = false;
							}
							
							fast3DUsedLayers.push(layer);
							
							/*
							changes.details.fast3DChanges += "\t" + template[stage].name + " area " + area + " had Layer " + layer + " of its fast3D changed!\n";
							changes.fast3DChanges += 1;*/
						}
						
						if (!fast3DIncrement && fast3DUsedLayers.toString() == Object.keys(rom1Stage.areas[area].fast3D).toString()) {
							changes.details.fast3DChanges += template[stage].name + " area " + area + " had every layer changed!\n";
							fast3DIncrement = true;
						}
					}
					
					if (fast3DIncrement) {
						changes.fast3DChanges += 1;
					}
					
					for (let warp of [...new Set([...Object.keys(rom1Stage.areas[area].warps), ...Object.keys(rom2Stage.areas[area].warps)])]) {
						// add warp logic
						if (rom1Stage.areas[area].warps[warp] && !rom2Stage.areas[area].warps[warp]) {
						//		console.log("warp removed! implement warp removals");
						} else if (!rom1Stage.areas[area].warps[warp] && rom2Stage.areas[area].warps[warp]) {
						//		console.log("warp added! implement warp additions");
						} else if (JSON.stringify(rom1Stage.areas[area].warps[warp]) != JSON.stringify(rom2Stage.areas[area].warps[warp])) {
								changes.details.warpChanges += "Warp " + warp + " in " + rom1Stage.name + "-" + area + " changed!\n";
								changes.warpChanges += 1;
						}
					}
				}
			}
		}
		
		function compareTexts(textType) {
			// insane
			for (let i = 0; i < Math.max(Object.values(rom1.text[textType]).length, Object.values(rom2.text[textType]).length); i++) {
				if (rom1.text[textType][i] != rom2.text[textType][i]) {
					changes.details[textType + "Changes"] += "Dialogue #" + i + " was changed!\n";
					changes[textType + "Changes"] += 1;
				}
			}
		}

		compareTexts("dialogue");
		compareTexts("levelNames");
		compareTexts("actNames");
		compareTexts("endingText");
		compareTexts("fileMenu");
		compareTexts("credits");
		
		binFile("./changes/removals.txt", changes.details.removals);
		binFile("./changes/additions.txt", changes.details.additions);
		binFile("./changes/object changes.txt", changes.details.objectChanges);
		binFile("./changes/geometry changes.txt", changes.details.geometryChanges);
		binFile("./changes/fast3d changes.txt", changes.details.fast3DChanges);
		binFile("./changes/dialogue changes.txt", changes.details.dialogueChanges);
		binFile("./changes/level name changes.txt", changes.details.levelNamesChanges);
		binFile("./changes/act name changes.txt", changes.details.actNamesChanges);
		binFile("./changes/ending text changes.txt", changes.details.endingTextChanges);
		binFile("./changes/file menu changes.txt", changes.details.fileMenuChanges);
		binFile("./changes/credits changes.txt", changes.details.creditsChanges);
		binFile("./changes/warp changes.txt", changes.details.warpChanges);
		
		let abridgedChanges = changes.additions + " areas added\n" + 
		changes.removals + " areas removed\n" + 
		changes.objectChanges + " areas had their objects changed\n" + 
		changes.geometryChanges + " areas had their geometry changed\n" + 
		changes.fast3DChanges + " areas had their fast3D changed\n" + 
		changes.dialogueChanges + " lines of dialogue were changed\n" + 
		changes.levelNamesChanges + " level names were changed\n" + 
		changes.actNamesChanges + " act names were changed\n" + 
		changes.endingTextChanges + " lines of ending dialogue were changed\n" + 
		changes.fileMenuChanges + " lines of file menu info were changed\n" + 
		changes.creditsChanges + " credits were changed\n" + 
		changes.warpChanges + " warps were changed\n";
		
		binFile("overall changes.txt", abridgedChanges);
		
		console.log("");
		
		let loggedChanges = "";
		
		if (changes.additions > 0)       loggedChanges += changes.additions + " areas added\n";
		if (changes.removals > 0)        loggedChanges += changes.removals + " areas removed\n";
		//if (changes.geometryChanges > 0) loggedChanges += changes.geometryChanges + " areas had their geometry changed\n";
		if (changes.fast3DChanges > 0)   loggedChanges += changes.fast3DChanges + " areas had their fast3D changed";
		
		console.log(loggedChanges);
	} else {
		console.log("only one rom given uwu");
	}
})();

/*
	let starType = (starID / 8) | 0;
	let stageID = starNames[starType];
	let star = {
		stage: stage.name + "-" + area,
		rawStarID:    starID,
		starID:       starID % 8,
		starType:     starType,
		starTypeName: starNames[starType],
		name: behaviorName,
        actMask: actMask
	};
	
	if (star.starType > 26) {
		stageID = "EX " + starNames[star.starType - 27 + 2];
		star.starTypeName = stageID;

		
		if (!starNames[stageID]) {
			starNames[stageID] = {};
		}
	}
	
	if (star.starTypeName == "Local") {
		stageID = stage.id;
	}
	
	stage.areas[area].stars.push(star);
	
    let starStage = stage.name;

	if (!output.stars[stage.id]) {
		output.stars[stage.id] = {
            starString: "00000000",

            mask: 0,
            areas: {}
        };
	}

	if (!output.stars[stage.id].areas[stage.name + "-" + area]) {
		output.stars[stage.id].areas[stage.name + "-" + area] = {

            mask: 0,
            stars: []
        };
	}

    let gameStarMask = output.stars[stage.id].mask;
    let areaStarMask = output.stars[stage.id].areas[stage.name + "-" + area].mask;
    let newStarMask = 2 ** starID;

    if ((gameStarMask | newStarMask) != gameStarMask) output.romInfo.minUniqueGameStars++;
    if ((areaStarMask | newStarMask) != areaStarMask) output.romInfo.minUniqueAreaStars++;
	
	output.stars[stage.id].areas[stage.name + "-" + area].stars.push(star);
	output.stars[stage.id].areas[stage.name + "-" + area].mask |= newStarMask;
	output.stars[stage.id].mask |= newStarMask;
	output.stars[stage.id].starString = output.stars[stage.id].mask.toString(2).split('').reverse().join('').padEnd(6, 0);
	output.romInfo.starTotal += 1;*/
