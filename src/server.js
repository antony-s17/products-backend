import app from "./app.js";
import { PORT } from "./misc/constants.js";
import { mongoDB } from "./db/config.js";

app.listen(PORT, async () => {
    try {
        await mongoDB();
    } catch (error) {
        console.error("Error connecting with mongo", error.message);
    }
    console.log(`Server is running on  http://localhost:${PORT}`);
});