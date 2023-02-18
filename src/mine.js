// Mine is an entity managing exploitation of single energy source

// Returns if there how much energy would be wasted in this mining cycle
function waste() {
    const source = Game.getObjectById(this.memory.source);
    const income = this.memory.income * soruce.ticksToRegeneration;
    return Math.max(source.energy - income, 0);
}

// Creates a single mine entry from its memory description
function mine(memory) {
    this.memory = memory;

    return {
        memory: memory,
        waste: waste,
    };
}

// Builds all the mines from the memory, or detecting sources in the room if mines info are
// missing.
function mines(room) {
    if(room.memory.mines == undefined) {
        room.memory.mines = _.map(
            room.find(FIND_SOURCES),
            {
                // Soruce exploited by this mine
                source: source.id,
                // How much energy is collected per tick by miners
                income: 0,
            }
        );
    }

    return {
        mines: _.map(
            room.memory.mines,
            m => mine(m)
        )
    }
}

module.exports = {
    mines: mines
}
