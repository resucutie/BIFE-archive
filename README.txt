Note: This tool was reuploaded by A user (resucutie) for archival purposes, with authorization from The Local Doe. All of the information below my notes are unaltered, and the files (except for unshiftma.js) are provided directly from THe Local Doe
Note 2: The following credits were provided by The Local Doe:
- "primarily developed by the local doe / hazardlady"
- "info used to develop provided by hack64, trollengine, pilzinsel's rom manager, and thegreatestroman"
- "BehaviorList.json and TextLocationList.json use code written primarily by pilzinsel, with custom objects from trollengine written by chlorobyte, kaze emanuar, and likely others"


BIFE:
 - Full name : B3313 Is Fluffy Examiner
 - Developer : The Local Doe

BIFE is a program that examines B3313 rom executables (.z64 format). The point of BIFE is to pick apart the details of a given rom in a short amount of time, as well as allowing for the comparison between two roms.

HOW TO USE:
 - BIFE requires node.js to be installed and for fs to be installed globally.
    - npm install fs -g
 - To setup BIFE, run the following command inside of BIFE's root folder
    - npm install
 - The above command installs the package "crc", which is used since nodejs's standard cryptography library doesn't have crc32 as a checksum method.
 - To use BIFE, run one of the commands below.
    - node main rom1
    - node main rom1 rom2
 - The first command will make a dump of the rom inside of ./bin/json/rom1.json
 - The second command will...
    - make a dump of both given roms inside of ./bin/json/rom1.json and ./bin/json/rom2.json.
    - add or update information inside of ./bin/overall changes.txt
    - detail every single change made inside of text documents found in ./bin/changes/
 - BIFE natively does not read roms that are shifted, but it does support custom implementations of shiftma. Think of this like an emulator needing a console's BIOS to run; The emulator needs proof you own the console, BIFE needs proof that you know how to unshift a rom. If you want to take a crack at making your own unshifting mechanism, the following should help...
    - This function should be stored in a file named "unshiftma.js", in the same folder that "main.js" is stored in.
    - This function should take the form "module.exports = () => {}".
    - This function takes three inputs; The rom (type Buffer), the head (type Number), and optionally a function that dumps the rom into the bin folder (type Function, input1 type String, input2 type Buffer)