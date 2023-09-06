

module.exports = transform = async (data) => {

        const op = [];
        
        for (let i=0; i<data.length ; i++){
            op.push(Object.values(JSON.parse(data[i][0]))); 
        }

        return  {
            header: Object.keys(JSON.parse(data[0][0])),
            data : op
        }
}