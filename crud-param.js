/**************************************************************
 *                                                            *
 * CRUD Parameters                                            *
 * by Sharnie Ivery                                           *
 *                                                            *
 * Create | Param.add('name', 'value');                       *
 * Read | Param.find('name');                                 *
 * Update | Param.update('name', 'new value');                *
 * Destroy | Param.remove('name');                            *
 *                                                            *
 **************************************************************/

var Param = {

    /**
     * Final modified URL parameters
     * @return Object: modified URL parameters object
     */
    result: {},

    /**
     * Fetch all URL parameters
     * @return Object: current URL parameters object
     */
    all: function() {

        var currentUrlParameters = window.location.href.match( /[^&#?]*\=[^&#?]*/gi );
        if ( currentUrlParameters instanceof Array && currentUrlParameters.length ) {
            for ( var i = 0; i < currentUrlParameters.length; i++ ) {

                var param = currentUrlParameters[i];
                    param = param.split( '=' );
                Param.result[param[0]] = param[1];
            }
        }

        return Param.result;
    },

    /**
     * Add URL parameter
     * @param -name of param- and -value of param-
     * @return String: param -value-
     */
    add: function( name, value ) {
        Param.result[name] = value;
        return Param.result[name];
    },

    /**
     * Find unmodified URL parameter
     * @param param name
     * @return String: param -value-
     */
    find: function( name ) {
        return name ? this.all()[ name ] : this.all();
    },

    /**
     * Update a specific URL parameter
     * @param -name of param- and -value of param-
     * @return String: param -value-
     */
    update: function( name, value ) {
        Param.result[name] = value;
        return Param.result[name];
    },

    /**
     * Update a specific URL parameter
     * @param -name of param- and -value of param-
     * @return String: param -value-
     */
    remove: function( name ) {
        delete Param.result[name];
    },

    /**
     * Helper functions
     */
    helper: {

        /**
         * Check if key exist in a given object
         * @param -key of interest- and -object to search- 
         * @return Boolean: -true/false-
         */
        inObject: function( key, object ) {
            var found = false;
            for ( var k in object ) {
                if ( k === key ) {
                    found = true;
                    break;
                }
            }

            return found;
        },

        /**
         * Object to query string
         * @param -object-
         * @return String: URL query string
         */
        objectToQueryString: function( object ) {
            var result = '';
            for ( var key in object ) {
                result += key + '=' + object[key] + '&';
            }
            result = result.substring(0, result.length - 1);

            return result;
        },

        /**
         * Query string to object
         * @param -query string-
         * @return Object: Query string object
         */
        queryStringToObject: function( queryString ) {
            var result = {},
                params = queryString.split( '&' );
            for ( var i = 0; i < params.length; i++ ) {
                var param = params[i].split( '=' );
                result[param[0]] = decodeURIComponent( param[1].replace(/\+/g, ' ') );
            }

            return result;
        },

        /**
         * Merge two objects
         * @param -result object- and -object to merge-
         * @return Object: Merged object
         */
        mergeObject: function( object1, object2 ) {
            var result = {};
            for ( var key in object1 ) {
                result[key] = object1[key];
            }

            for ( var key in object2 ) {
                result[key] = object2[key];
            }

            return result;
        }
    }
};