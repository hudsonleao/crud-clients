conn = new Mongo();
db = conn.getDB("crud-clients");

db.createUser(
    {
        user: "root",
        pwd: "root",
        roles: [
            {
                role: "readWrite",
                db: "crud-clients"
            }
        ]
    }
)

db.users.insert({
    created_by: 'system',
    updated_by: 'system',
    name: 'Administrador',
    user: 'admin',
    // password = gd2D2@cjwcvneSMs2Sc_ew
    password: 'e025931cd226c575196f9a9f76de0125',
    is_deleted: false,
    active: true
});