// Import the Express module and create an instance of the app
const express = require("express")
const _PORT = 3000
const app = express()

//----------------------------------------------------------------

// Middleware to parse incoming JSON requests
app.use(express.json())

// Sample array of player objects (Blue Lock characters)
const players = [
    { id: 1, name: "Michael Kaiser", age: 17 },
    { id: 2, name: "Isagi Yoichi", age: 16 },
    { id: 3, name: "Bachira Meguru", age: 16 },
    { id: 4, name: "Rin Itoshi", age: 17 }
]


//----------------------------------------------------------------


// Route to get all players
app.get("/players", (req, res) => {
    res.send(players)
})


// Route to get a player by ID
app.get("/players/:id", (req, res) => {
    const { id } = req.params
    const foundPlayer = players.find(p => p.id === Number(id))

    // Check if the player exists
    if (foundPlayer) {
        res.status(200).json({
            message: "Player found",
            player: foundPlayer
        })
    } else {
        res.status(404).json({
            message: "Player not found"
        })
    }
})


//----------------------------------------------------------------


// Route to create a new player
app.post("/create", (req, res) => {
    let { newPlayer } = req.body

    // Assign a new ID and push the player to the array
    newPlayer = {
        id: players.length + 1,
        ...newPlayer
    }
    players.push(newPlayer)

    // Respond with the created player details
    res.status(200).json({
        message: "Player created",
        player: newPlayer
    })
})


//----------------------------------------------------------------


// Route to update a player by ID
app.put("/update/:id", (req, res) => {
    const { id } = req.params
    const foundPlayer = players.find(p => p.id === Number(id))

    // Check if the player exists
    if (foundPlayer) {
        const { name, age } = req.body.updatePlayer

        // Update the player details
        foundPlayer.name = name
        foundPlayer.age = age

        res.status(200).json({
            message: "Player updated",
            player: foundPlayer
        })
    }
})


//----------------------------------------------------------------


// Route to delete a player by ID (method 1: using splice)
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    const index = players.findIndex(p => p.id === Number(id))

    // Check if the player exists
    if (index !== -1) {
        // Remove the player from the array
        players.splice(index, 1)
        res.status(200).json({
            message: "Player deleted",
            players: players
        })
    } else {
        res.status(404).json({
            message: "Player not found"
        })
    }
})


// Route to delete a player by ID (method 2: using filter)
app.delete("/delete-filter/:id", (req, res) => {
    const { id } = req.params
    const newPlayers = players.filter(p => p.id !== Number(id))

    // Check if any players were removed
    if (newPlayers.length === players.length) {
        res.status(404).json({
            message: "Player not found"
        })
    } else {
        res.status(200).json({
            message: "Player deleted",
            players: newPlayers
        })
    }
})

//----------------------------------------------------------------


// Start the server and listen on the specified port
app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}/`)
})
