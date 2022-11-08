import {ApplicationCommandData, Client, ClientOptions, Events, Collection} from "discord.js";
import {config} from "../config";
import {glob} from "glob";
import {promisify} from "util";
import {DiscordEvent} from "../typings/Event";
import {DiscordCommand} from "../typings/Interaction";

const pGlob = promisify(glob);

export class DiscordTsBot extends Client {
    private _publicCommands: ApplicationCommandData[] = [];
    private _privateCommands:  ApplicationCommandData[] = [];
    private _commandsCollection: Collection<string, DiscordCommand> = new Collection();

    constructor(options: ClientOptions) {
        super(options);
    }

    get publicCommands(){
        return this._publicCommands
    }

    get privateCommands(){
        return this._privateCommands
    }

    get commandsCollection(){
        return this._commandsCollection
    }

    start(): void {
        console.info("------ IMPORTATION ------");
        this._registerCommands();
        this._registerEvents();
        this.login(config.bot.token);
    }

    private async _registerCommands(): Promise<void> {
        (await pGlob(`${__dirname.replaceAll('\\', '/')}/../commands/*/*.{ts,js}`)).map(
            async path => {
                import(path).then(e => {
                    if (!e.cmd) return console.error(`Ce fichier ne possède pas de commande (${path})`);
                    if (!e.cmd.description) return console.error(`La commande ${e.event.name} n'est pas valide`);
                    const cmd:  DiscordCommand = e.cmd;
                    if (cmd.isPublic) {
                        this._publicCommands.push(cmd);
                    }else {
                        this._privateCommands.push(cmd);
                    }
                    this._commandsCollection.set(cmd.name, cmd);
                    console.log(`Importation [CMD]: ${cmd.name}`);
                });
            }
        )
    }

    private async _registerEvents(): Promise<void>{
        (await pGlob(`${__dirname.replaceAll('\\', '/')}/../events/*/*.{ts,js}`)).map(
            async path => {
                import(path).then(e => {
                    if (!e.event) return console.error(`Ce fichier ne possède pas d'événement (${path})`);
                    if (!Object.values(Events).includes(e.event.name)) return console.error(`L'événement ${e.event.name} n'est pas valide`);
                    const event: DiscordEvent = e.event;
                    if(event.once){
                        // @ts-ignore
                        this.once(event.name, (...args: any[]) => event.action(this, ...args));
                    }else {
                        // @ts-ignore
                        this.on(event.name, (...args: any[]) => event.action(this, ...args));
                    }
                    console.log(`Importation [EVT]: ${event.name}`);
                });
            }
        )
    }

}