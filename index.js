const { Client, IntentsBitField, Partials, PermissionsBitField } = require("discord.js");
require("dotenv/config");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
    ],
    partials: [Partials.Channel],
});

var guild = null;
var unlockedRole = null;
var member = null;

// unlockedRole.setPermissions([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageEmojisAndStickers, PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.UseSoundboard, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.PrioritySpeaker, PermissionsBitField.Flags.ManageEvents]);

client.on("ready", async () => {
    console.log("bot online");

    guild = client.guilds.cache.get("1112439732371194046");
    unlockedRole = guild.roles.cache.get("1112441814939619389");
    member = await guild.members.fetch("874730179468079159");
});

client.login(process.env.TOKEN);

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("server online");
});

app.post("/unlock", (req, res) => {
    if (req.body.pass === process.env.PASS) {
        member.roles.add(unlockedRole);
        res.send(200);
    } else {
        res.send(401);
    }
});

app.post("/lock", (req, res) => {
    if (req.body.pass === process.env.PASS) {
        member.roles.remove(unlockedRole);
        res.send(200);
    } else {
        res.send(401);
    }
});

app.listen(5000, () => {
    console.log("server online");
});