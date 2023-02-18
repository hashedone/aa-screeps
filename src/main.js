const miner = require('miner');

function spawn_creeps() {
    for(const idx in Game.spawns) {
        const spawn = Game.spawns[idx];
        const max_cost = spawn.room.energyCapacityAvailable;

        const miner_body = miner.body(max_cost);

        const mem_next_id = spawn.memory.next_id;
        const next_id = (mem_next_id ? mem_next_id : 0)
        const id = spawn.name + '_' + next_id;

        if(spawn.spawnCreep(miner_body, miner.name(id)) == OK) {
            spawn.memory.next_id = next_id + 1;
        }
    }
}

module.exports.loop = () => {
    spawn_creeps();
}
