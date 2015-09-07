module.exports = function(){
    var config = {
        /**
         * File paths
        **/
        // all src js files
        allhtml: ['./src/index.html'],
        alljs:   ['./src/**/*.js'],
        alltemplates: ['./src/**/*.handlebars'],
        allsass: ['./src/**/*.scss'],
        allimg: ['./src/**/*.png','./src/**/*.jpg'],
        proxy: {
            path: '/proxy',
            pathto: 'https://auto.ria.com/',
            testurl: 'blocks_search_ajax/search?category_id=1&marka_id=98&model_id=955&state=0&category_id=1&state[0]=0&s_yers[0]=0&po_yers[0]=0&currency=1&marka_id[0]=98&model_id[0]=955&countpage=10&page=1'
        }
    };
    
    return config;
} 