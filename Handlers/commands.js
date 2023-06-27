const fs = require('fs');
const chalk = require('chalk');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const config = require('../settings/config.js')
// ATZNE DEV
const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Stats').setBorder('|', '=', "0", "0")
// ATZNE DEV
const TOKEN = config.app.token;
const CLIENT_ID = config.app.clientid;
// ATZNE DEV
const rest = new REST({ version: '10' }).setToken(TOKEN);
// ATZNE DEV
module.exports = (client) => {
	const slashCommands = []; 
// ATZNE DEV
	fs.readdirSync('./Commands/').forEach(async dir => {
		const files = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'));
// ATZNE DEV
		for(const file of files) {
				const slashCommand = require(`../Commands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
			// ATZNE DEV
				if(slashCommand.name) {
						client.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(file.split('.js')[0], '🟢')
				} else {
						table.addRow(file.split('.js')[0], '⛔')
				}
		}
		// ATZNE DEV
	});
	console.log(chalk.red(table.toString()));
// ATZNE DEV
	(async () => {
			try {
				await rest.put(
					process.env.GUILD_ID ?
					Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID) :
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
				);
				console.log(chalk.cyan('[-] Slash Commands Registered'))
			} catch (error) {
				console.log(error);
			}
	})();
};