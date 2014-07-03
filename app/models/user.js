exports.setup = function(_mongoose,_db){

    var file_name = require('path').basename( __filename, '.js' );

    var schema = _mongoose.Schema({
        email: {
            type: String,
            index: {
                unique: true
            }
        },
        name: String,
        password: String,
        cards: [
            {
                name: String,
                number: String
            }
        ],
        created_at: {
            type: Date,
            default: Date.now
        }
    });

    _db.model( file_name, schema);

    var data = _db.model( file_name );

    return data;
};