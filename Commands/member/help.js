const { PermissionFlagsBits, Client, EmbedBuilder, ApplicationCommandType } = require("discord.js");
const config = require('./../../settings/config.js');
// ATZNE DEV
module.exports = {
  name: "help",
  description: `help command of @AutoInsult`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "member",
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} inter
   */
  run: async (client, inter) => {

      const embed = new EmbedBuilder()
      embed.setTitle(`Command help`)
      embed.addFields(
        { name: `Autoinsult:`, value: `\`systemuhq\``, inline: false },
      )
      embed.setColor(config.embed.color)
      embed.setFooter({ text: config.embed.footer })

      inter.reply({ embeds: [embed] });
  }
};