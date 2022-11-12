module.exports = {
    resolve: {
        fallback: { "buffer": require.resolve("buffer/")
        
    }},

    resolve: {
        fallback: { "util": require.resolve("util/")    
    }}, 

    resolve: {
        fallback: { "stream": require.resolve("stream-browserify")    
    }},

    resolve: {
        fallback: { "crypto": require.resolve("crypto-browserify")   
    }},

}