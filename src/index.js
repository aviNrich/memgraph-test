var neo4j = require("neo4j-driver");

const main = async () => {
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
        const result = await session.writeTransaction((tx) =>
            tx.run(
                'CREATE (a:Greeting) SET a.message = $message RETURN "Node " + id(a) + ": " + a.message',
                {
                    message: "Hello, World!",
                }
            )
        );

        const singleRecord = result.records[0];
        const greeting = singleRecord.get(0);

        console.log(greeting);
    } finally {
        await session.close();
    }

    await driver.close();
}

(async function () {
    await main();
})()