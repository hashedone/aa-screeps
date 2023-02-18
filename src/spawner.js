// Spawner is an utility managing spawawning Screeps in a single room for a long-run.
//
// It accepts orders for new spawns, and prioritizes their order basing on room needs.

// Create spawner for the room
function spawner(room) {
    if(room.memory.spawner == undefined) {
        room.memory.spawner = {
            spawns: room.find(FIN_MY_STRUCTURES, {
                structureType: STRUCTURE_SPAWN
            }),
            queue: [],
        };
    }

    return {
        memory: room.memory.spawner
    }
}

// Create spawners for all owned rooms
function spawners() {
    return {
        spawners: _.mapValues(
            Game.rooms,
            room => {
                spawner(room),
            }
        );
    }
}

module.exports = {
    spawners: spawners
}
