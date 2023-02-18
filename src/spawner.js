// Spawner is an utility managing spawawning Screeps in a single room for a long-run.
//
// It accepts orders for new spawns, and prioritizes their order basing on room needs.

// Enqueues and order. Body is requested body, name is the name prefix (doesn't have to be uniqueue - it will
// be suffixed with spawn name + id), memory is the memory to initialize it with.
function order(body, name, memory) {
    this.memory.queue.push({
        body: body,
        name: name,
        memory: memory
    })
}

// Create spawner for the room
function spawner(room) {
    if(room.memory.spawner == undefined) {
        room.memory.spawner = {
            spawns: _.mapValues(
                room.find(FIND_MY_STRUCTURES, {
                    filter: {
                        structureType: STRUCTURE_SPAWN
                    }
                }),
                spawn => spawn.id,
            ),
            queue: [],
            id: 0,
        };
    }

    const spawner = {
        memory: room.memory.spawner,
        order: order
    };

    room.spawner = spawner;
    return spawner;
}

// Create spawners for all owned rooms
function spawners() {
    return {
        spawners: _.mapValues(
            Game.rooms,
            spawner
        )
    }
}

module.exports = {
    spawners: spawners
}
