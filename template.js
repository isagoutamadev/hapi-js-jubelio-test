const CONTROLLER = `const Service = require('../services/{MODULE_NAME}Service');

async function getList(request, h) {
    try {
        const { page = 1, limit = 10 } = request.query;
        const result = await Service.getList({page: Number(page), limit: Number(limit)});

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function getById(request, h) {
    try {
        const { id } = request.params;
        const result = await Service.getById(id);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function create(request, h) {
    try {
        const data = request.payload;
        const result = await Service.create(data);

        return h.response(result).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function update(request, h) {
    try {
        const { id } = request.params;
        const payload = request.payload;
        const result = await Service.update(id, payload);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function deleteData(request, h) {
    try {
        const { id } = request.params;
        await Service.deleteData(id);
        
        return h.response().code(204);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.code || 500);
    }
}

module.exports = {
    getList,
    getById,
    create,
    update,
    deleteData,
};`;

const SERVICE = `const Model = require('../models/{MODULE_NAME}Model');

async function getList({page, limit}) {
    try {
        const result = await Model.getDatas({page, limit});

        return result;
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        const data = await Model.getById(id);
        if (data) {
            return data;
        }

        throw { statusCode: 404, message: "{MODULE_NAME} not found"};
    } catch (error) {
        throw error;
    }
}

async function create(data) {
    try {
        const result = await Model.create(data);

        return result;
    } catch (error) {
        throw error;
    }
}

async function update(id, data) {
    try {
        const result = await Model.update(id, data);

        if (result) {
            return result;
        }

        throw { statusCode: 404, message: "{MODULE_NAME} not found"};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteData(id) {
    try {
        const deleted = await Model.deleteData(id);
        if (deleted) {
            return deleted;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getList,
    getById,
    create,
    update,
    deleteData,
};
`;
const query = "${query}";
const MODEL = `const db = require('../utils/DB');

async function count(query) {
    const { rows } = await db.raw(\`SELECT COUNT(x.id) FROM (${query}) as x\`);

    return rows[0].count;
}

async function getDatas({ page, limit }) {
    const offset = (page - 1) * limit;
    let query = "SELECT id, name FROM m_{MODULE_NAME_LOWER}s WHERE deleted_at IS NULL";

    const total = await count(query);

    query += " LIMIT :limit OFFSET :offset";
    const { rows } = await db.raw(query, { limit, offset });

    return {
        page: page,
        limit: limit,
        total_data: Number(total),
        total_page: Math.ceil(total / limit),
        datas: rows
    };
}

async function getById(id) {
    const query = \`
    SELECT id, name FROM m_{MODULE_NAME_LOWER}s
    WHERE id = :id AND deleted_at IS NULL
    \`;
    const { rows } = await db.raw(query, { id });
    return rows[0];
}

async function create(data) {
    const { name, description = null } = data;
    console.log(data);
    const query = \`
    INSERT INTO m_{MODULE_NAME_LOWER}s (name, description)
    VALUES (:name, :description)
    RETURNING *
    \`;
    const { rows } = await db.raw(query, { name, description });
    return rows[0];
}

async function update(id, data) {
    const { name, description } = data;
    const query = \`
    UPDATE m_{MODULE_NAME_LOWER}s
    SET name = :name, description = :description
    WHERE id = :id
    RETURNING *
    \`;
    const { rows } = await db.raw(query, { name, description: description || null, id });
    return rows[0];
}

async function deleteData(id) {
    const query = \`
    UPDATE m_{MODULE_NAME_LOWER}s
    SET deleted_at = now()
    WHERE id = :id
    RETURNING *
    \`;
    const { rows } = await db.raw(query, { id });
    return true;
}

module.exports = {
    getDatas,
    getById,
    create,
    update,
    deleteData,
};
`;

const ROUTE = `const Controller = require('../controllers/{MODULE_NAME}Controller');

const routes = [
    {
        method: 'GET',
        path: '/{MODULE_NAME_LOWER}s',
        handler: Controller.getList,
    },
    {
        method: 'GET',
        path: '/{MODULE_NAME_LOWER}s/{id}',
        handler: Controller.getById,
    },
    {
        method: 'POST',
        path: '/{MODULE_NAME_LOWER}s',
        handler: Controller.create,
    },
    {
        method: 'PUT',
        path: '/{MODULE_NAME_LOWER}s/{id}',
        handler: Controller.update,
    },
    {
        method: 'DELETE',
        path: '/{MODULE_NAME_LOWER}s/{id}',
        handler: Controller.deleteData,
    },
];

module.exports = routes;`;

module.exports = {
    CONTROLLER,
    SERVICE,
    MODEL,
    ROUTE
}