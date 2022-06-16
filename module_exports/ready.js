function ready(bot_name) {
    !bot_name.length ? bot_name = "Your Bot" : bot_name
    let amount = bot_name.length;

    let line = '─'.repeat(amount);
    let space = ' '.repeat(amount)

    console.log(`╭${line}─────────────────────────────────────────────────────╮`)
    console.log(`│${space}                                                     │`)
    console.log(`│${space}                                                     │`)
    console.log(`│               ${bot_name} is online and updated!               │`)
    console.log(`│${space}                                                     │`)
    console.log(`│${space}                                                     │`)
    console.log(`╰${line}─────────────────────────────────────────────────────╯`)
};

module.exports = ready;