function body(max_cost) {
    // Miner is supposed to sit near its mine forever and never move, and have one buffer CARRY part,
    // so it doesn't drop energy on the floor - it will be taken from him by transporters. Therefore
    // they always have one MVOE and one CARRY part, everything else being filled with WORK part.
    //
    // With many WORK part it might be a bit slow this way, but we don't really care - it has to reach
    // destination only once in their lifetime.
    const base_cost = BODYPART_COST[MOVE] + BODYPART_COST[CARRY];
    const work_cost = max_cost - base_cost;
    
    // There can be at most 50 body parts, so 48 WORK body parts
    const work_cnt = Math.min(Math.floor(work_cost / BODYPART_COST[WORK]), 48);
    const work = Array(work_cnt).fill(WORK);

    return [CARRY, MOVE].concat(work);
}

function name(id) {
    return "Miner_" + id;
}

