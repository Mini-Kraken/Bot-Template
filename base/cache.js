/**
 * @file Sistema de Cache Customizado
 * @author Semanual
 */

/**
 * @class
 */
const NodeCache = require("node-cache");

/**
 * @class
 */
class Cache {
    /**
     * @constructor
     * @description Cria um novo tipo de cache
     * @param {NodeCache.Options | undefined} options - Opções do cache
     * @param {function(string, ...any): Promise<any>} getCallback - O callback para obter um valor
     * @param {function(string, any, ...any): Promise<any>} setCallback - O callback para setar um valor
     */
    constructor(options, getCallback, setCallback) {
        /**
         * @private
         * @type {NodeCache}
         */
        this._cache = new NodeCache(options);

        /**
         * @private
         * @type {function(string, ...any): Promise<any>}
         */
        this._getCallback = getCallback;

        /**
         * @private
         * @type {function(string, any, ...any): Promise<any>}
         */
        this._setCallback = setCallback;
    }

    /**
     * @function get
     * @description Obtém um valor do cache e renova o seu tempo de expiração.
     * @param {string} key - Identificador único do valor a obter.
     * @param {...any} args - Argumentos adicionais a serem passados para a função.
     * @returns {Promise<any>}
     */
    async get(key, ...args) {
        // Tenta renovar seu tempo de expiração, se conseguir, é porque existe, então retorna o valor.
        if (this._cache.ttl(key)) {
            return this._cache.get(key);
        }

        // Se não existir, chama o callback
        const value = await this._getCallback(key, ...args);
        this._cache.set(key, value);
        return value;
    }

    /**
     * @function set
     * @description Define um novo valor no cache e o retorna.
     * @param {string} key - Identificador único do valor a definir.
     * @param {any} value - Valor a ser definido.
     * @param {...any} args - Argumentos adicionais a serem passados para a função.
     * @returns {any}
     */
    async set(key, value, ...args) {
        // Chama o callback e seta a key no cache
        const currentValue = await this.get(key, ...args)
        const entireValue = await this._setCallback(currentValue, key, value, ...args);
        this._cache.set(key, entireValue);
        return entireValue;
    }
}

module.exports = Cache;