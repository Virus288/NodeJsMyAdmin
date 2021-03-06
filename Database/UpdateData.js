const {con} = require("./DBConnect")

const updateData = async (data) => {
    // Error handler
    const ErrorHandler = (err) => {
        console.log(err)
        if(err.errno == "1062"){
            return(`Item that you are trying to register, already exists in database. If you are trying to edit that item, go to "edit items in stock"`)
        } else {
            return(`Seems like we have an error. Developer information ${err.errno}`)
        }
    }

    let query;

    if(data.database === "Test"){
        query = `Update ${data.database} SET code = '${data.code}', name = '${data.name}' where id = '${data.id}'`
    } else {
        query = `Update ${data.database} SET code = '${data.code}', price = '${data.price}' where id = '${data.id}'`
    }

    // Get request from database
    const AddReq = async (category, data) => {
        return new Promise((resolve, reject) => {
            con.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve("Success");
                }
            });
        }).catch((err) => ErrorHandler(err));
    }

    let Data;
    await AddReq(data).then(data => Data=data);
    console.log(Data)
    return Data
}

module.exports = {
    updateData
}
