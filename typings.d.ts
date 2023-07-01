import * as Discord from "discord.js";
import * as NodeCache from "node-cache";

export module "*.js" {
	var value: any;
	export = value;
}

export interface Interaction extends Discord.Interaction {
	client: Client
}

export interface CommandInteraction extends Discord.CommandInteraction {
	client: Client
}

export interface ButtonInteraction extends Discord.ButtonInteraction {
	client: Client
}

export interface SelectMenuInteraction extends Discord.SelectMenuInteraction {
	client: Client
}

export interface ContextMenuCommandInteraction extends Discord.ContextMenuCommandInteraction {
	client: Client
}

export interface ModalSubmitInteraction extends Discord.ModalSubmitInteraction {
	client: Client
}

export interface AutocompleteInteractionValue extends Discord.AutocompleteInteraction {
	client: Client
}

/**
 * Represents an Application Command (Slash Command).
 */
export interface SlashInteractionCommand {
	/**
	 * The data of Application Command Interaction (Slash Command).
	 */
	data: Discord.SlashCommandBuilder;
	options: Array<
		| Discord.SlashCommandStringOption
		| Discord.SlashCommandNumberOption
		| Discord.SlashCommandRoleOption
		| Discord.SlashCommandUserOption
		| Discord.SlashCommandBooleanOption
		| Discord.SlashCommandChannelOption
		| Discord.SlashCommandIntegerOption
	>;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: CommandInteraction
	): void | Promise<void>;
}

/**
 * Represents a Button Interaction.
 */
export interface ButtonInteractionCommand {
	/**
	 * The custom ID of the button which was interacted with.
	 */
	id: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: ButtonInteraction
	): void | Promise<void>;
}

/**
 * Represents a Select Interaction.
 */
export interface SelectInteractionCommand {
	/**
	 * The custom ID of the select (menu option) which was interacted with.
	 */
	id: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: SelectMenuInteraction
	): void | Promise<void>;
}

/**
 * The data of Context Menu Interaction Command.
 */
export interface ContextInteractionCommandData {
	/**
	 * The name of the context (menu option) which was interacted with.
	 */
	name: string;

	/**
	 * The type of the context (menu option) which was interacted with.
	 * 2: User Based Context Menu Option.
	 * 3: Message Based Context Menu Option.
	 */
	type: 2 | 3;
}

/**
 * Represents a Context Interaction.
 */
export interface ContextInteractionCommand {
	/**
	 * The data of Context Menu Interaction Command.
	 */
	data: ContextInteractionCommandData;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: ContextMenuCommandInteraction
	): void | Promise<void>;
}

/**
 * Represents a ModalSubmit Interaction.
 */
export interface ModalInteractionCommand {
	/**
	 * The custom ID of the modal (submit) which was interacted with.
	 */
	id: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: ModalSubmitInteraction
	): void | Promise<void>;
}

/**
 * Represents a Autocomplete Interaction.
 */
export interface AutocompleteInteraction {
	/**
	 * The command name of the autocomplete interaction which was interacted with.
	 */
	name: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: AutocompleteInteractionValue
	): void | Promise<void>;
}

export interface ServerInfo {
	rpgSystem: number
	isCustomRpgSystem: boolean
	money_name: string
	money_symbol: string
	gameMasterId: number
	table_money_symbol: string
	iniciativa: string
	premium: boolean
}

export interface Ficha {
  	card: object,
  	dices: object,
  	expertises: object
}

interface Callbacks {
	async get (key: string, ...args: any[]): Promise<any>;
	async set (key: string, value: any, ...args: any[]): void;
}

export interface Cache {
	_cache: NodeCache;
	_getCallback: Callbacks["get"];
	_setCallback: Callbacks["set"];
	
	/**
	 * @constructor
	 * @description Cria um novo tipo de cache
     * @param options - Opções do cache
     * @param getCallback - O callback para obter um valor
     * @param setCallback - O callback para setar um valor
	 */
	constructor(
		options: NodeCache.Options | undefined, 
		getCallback: Callbacks["get"], 
		setCallback: Callbacks["set"]
	): Cache;

	/**
	 * @function get
	 * @async
	 * @description Obtém um valor do cache e renova o seu tempo de expiração.
	 * @param key - Identificador único do valor a obter.
	 * @param args - Argumentos adicionais a serem passados para a função.
	 */
	async get(key: string, ...args: any[]): Promise<any>;

	/**
	 * @function set
	 * @description Define um novo valor no cache.
	 * @param key - Identificador único do valor a definir.
	 * @param value - Valor a ser definido.
	 * @param args - Argumentos adicionais a serem passados para a função.
	 * @returns {void}
	 */
	set(key: string, value: any, ...args: any[]): void;
}

/**
 * Modified in-built Client that includes support for command/event handlers.
 */
export interface Client extends Discord.Client {

	/**
	 * Represents a collection of Application Commands (Slash Commands).
	 */
	slashCommands: Discord.Collection<string, SlashInteractionCommand>;

	/**
	 * Represents a collection of Button Interactions.
	 */
	buttonCommands: Discord.Collection<string, ButtonInteractionCommand>;

	/**
	 * Represents a collection of Select Interactions.
	 */
	selectCommands: Discord.Collection<string, SelectInteractionCommand>;

	/**
	 * Represents a collection of Context Interactions.
	 */
	contextCommands: Discord.Collection<string, ContextInteractionCommand>;

	/**
	 * Represents a collection of ModalSubmit Interactions.
	 */
	modalCommands: Discord.Collection<string, ModalInteractionCommand>;

	/**
	 * Represents a collection of autocomplete interactions.
	 */
	autocompleteInteractions: Discord.Collection<string, AutocompleteInteraction>;
	
}

export interface SelectMenuRowOptions {
	label: string, 
	emoji: string, 
	value: string
}

