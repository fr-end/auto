module.exports = function(){
    var config = {
        /**
         * File paths
        **/
        // all src js files
        alljs: [
            './src/**/*.js'
        ],
        allsass: [
            './src/**/*.scss'
        ],
        proxy: {
            path: '/proxy',
            pathto: 'https://auto.ria.com/blocks_search_ajax/search',
            port: 9000,
            testurl: '?category_id=1&amp;marka_id=98&amp;model_id=955&amp;state=0#category_id=1&amp;state[0]=0&amp;s_yers[0]=0&amp;po_yers[0]=0&amp;currency=1&amp;marka_id[0]=98&amp;model_id[0]=955&amp;countpage=10&amp;page=1'
        }
    };
    
    return config;
} 