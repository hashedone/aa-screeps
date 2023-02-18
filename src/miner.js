const BASE_COST = BODYPART_COST[MOVE] + BODYPART_COST[CARRY];
// How much mining power can we get for given cost?
function max_power(max_cost) {
    const work_cost = max_cost - BASE_COST;

    // 48 is technically the most WORK parts we can have on miner (one CARRY and MOVE are required).
    // It will probably never make sens, but let leave it for calculation.
    const work_cnt = Math.min(Math.floor(work_cost / BODYPART_COST[WORK]), 48);

    return work_cnt * HARVEST_POWER;
}

// Creates new miner spawn order
function order(max_cost, power) {
    // Miner is supposed to sit near its mine forever and never move, and have one buffer CARRY part,
    // so it doesn't drop energy on the floor - it will be taken from him by transporters. Therefore
    // they always have one MVOE and one CARRY part, everything else being filled with WORK part.
    const work_cost = max_cost - BASE_COST;
    
    const work_cnt = Math.min(Math.floor(work_cost / BODYPART_COST[WORK]), 48);
    const work = Array(work_cnt).fill(WORK);

    // Exceed we can use for CARRY part - usefull so miner can store more resoruces unless hauler has
    // to empty it.
    const carry_cnt = work_cost - work * BODYPART_COST[WORK];

    // We can never have more than (50 - 2 - 5) = 43 extra CARRY parts
    const carry_cnt = Math.min(Math.floor(carry_cost / BODYPART_COST{CARRY]), 48 - work_cnt);
    const carry = Array(carry_cnt).fill(CARRY);

    return {
        body: [CARRY].concat(carry, [MOVE], work),
        memory: {
            // How fast this mine can mine
            power: HARVEST_POWER * work_cnt
        }
    }
}

function name(id) {
    return "Miner_" + id;
}

module.exports = {
    order: order,
    name: name
}

