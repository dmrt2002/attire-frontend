import { useEffect, useState } from "react";
import { notification } from 'antd';

export default function Login() {
    const [api, contextHolder] = notification.useNotification();
    const [coordinates, setCoordinates] = useState({
        x: 5,
        y: 5
    })
    const [position, setPosition] = useState({
        x: 1,
        y: 2,
        d: "N"
    })
    const [output, setOutput] = useState(null)

    const [commands, setCommands] = useState("LFLFLFLFF")

    const handleKeyDown = (event) => {
        if (event.key === "Backspace") {
            return;
        }
        const allowedChars = ['l', 'r', 'f', 'L', 'R', 'F'];
        if (!allowedChars.includes(event.key)) {
            event.preventDefault();
        } else {
            setCommands(commands + event.key);
        }
    };

    const handleKeyDownDirection = (event) => {
        if (event.key === "Backspace") {
            return;
        }
        const allowedChars = ['n', 's', 'w', 'e', 'N', 'S', 'W', 'E'];
        if (!allowedChars.includes(event.key)) {
            event.preventDefault();
        } else {
            setPosition({
                ...position,
                d: position.d + event.key
            });
        }
    };

    useEffect(() => {
        navigateInsects()
    }, [])

    const onSubmit = () => {
        if (!coordinates.x || !coordinates.y || !position.x || !position.y || !position.d) {
            api.open({
                message: 'Action Required',
                description:
                    'Please provide room size, initial coordinates properly',
                duration: 2.0,
            });
        }
        else {
            navigateInsects()
        }
    }

    function navigateInsects() {
        let x = position.x;
        let y = position.y;
        console.log("inital position by user", x, y)
        let direction = position.d.toUpperCase();

        for (let command of commands) {
            console.log("current command", command)
            command = command.toUpperCase()
            switch (command) {
                case "L":
                    direction = turnLeft(direction);
                    console.log("turnLeft direction", direction)
                    break;
                case "R":
                    direction = turnRight(direction);
                    console.log("turnRight direction", direction)
                    break;
                case "F":
                    [x, y] = moveForward(x, y, direction);
                    console.log("moveForward coordinates", x, y)
                    break;
                default:
                    console.error(`Invalid command: ${command}`); // Handle unexpected commands
            }
        }
        setOutput(`Output: ${[x, y, direction].join(" ")}`)
    }

    function turnLeft(currentDirection) {
        const directions = ["N", "E", "S", "W"];
        const currentIndex = directions.indexOf(currentDirection);
        const newIndex = (currentIndex - 1 + directions.length) % directions.length;
        return directions[newIndex];
    }

    function turnRight(currentDirection) {
        const directions = ["N", "E", "S", "W"];
        const currentIndex = directions.indexOf(currentDirection);
        const newIndex = (currentIndex + 1) % directions.length;
        return directions[newIndex];
    }

    function moveForward(x, y, direction) {
        let maxX = coordinates.x;
        let maxY = coordinates.y;
        console.log("max coordinates", maxX, maxY, x, y, direction)
        switch (direction) {
            case "N":
                y = Math.min(y + 1, maxY);
                break;
            case "E":
                x = Math.min(x + 1, maxX);
                break;
            case "S":
                y = Math.max(y - 1, 0);
                break;
            case "W":
                x = Math.max(x - 1, 0);
                break;
        }
        return [x, y];
    }

    return (
        <>
            {contextHolder}
            <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Spy agency problem
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Coordinates
                            </label>
                            <div className="mt-2 flex justify-around">
                                <input
                                    id="x"
                                    name="x"
                                    type="number"
                                    label="x coordinate"
                                    onChange={(e) => setCoordinates({
                                        ...coordinates,
                                        x: e.target.value
                                    })}
                                    value={coordinates.x}
                                    className="block pl-4 w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <input
                                    id="y"
                                    name="y"
                                    type="number"
                                    label="x coordinate"
                                    onChange={(e) => setCoordinates({
                                        ...coordinates,
                                        y: e.target.value
                                    })}
                                    value={coordinates.y}
                                    className="block pl-4 w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Current position
                            </label>
                            <div className="mt-2 flex justify-around">
                                <input
                                    id="positionx"
                                    name="positionx"
                                    type="number"
                                    label="x coordinate"
                                    onChange={(e) => setPosition({
                                        ...position,
                                        x: e.target.value
                                    })}
                                    value={position.x}
                                    className="block pl-4 w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <input
                                    id="positiony"
                                    name="positiony"
                                    type="number"
                                    label="y coordinate"
                                    onChange={(e) => setPosition({
                                        ...position,
                                        y: e.target.value
                                    })}
                                    value={position.y}
                                    className="block pl-4 w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <input
                                    id="position"
                                    name="position"
                                    type="text"
                                    label="x coordinate"
                                    onChange={(e) => setPosition({
                                        ...position,
                                        d: e.target.value
                                    })}
                                    value={position.d}
                                    onKeyDown={handleKeyDownDirection}
                                    className="block pl-4 w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Commands
                            </label>
                            <div className="mt-2 flex justify-around">
                                <input
                                    id="x"
                                    name="x"
                                    type="text"
                                    label="x coordinate"
                                    onChange={(e) => setCommands(e.target.value)}
                                    value={commands}
                                    onKeyDown={handleKeyDown}
                                    className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => onSubmit()}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>

                        {output && (
                            <>
                                <div className="bg-sky-100 p-4 mt-4 rounded-md border-[1px] border-sky-400">
                                    <p
                                        className="text-sm text-center text-sky-600"
                                        style={{ fontSize: "0.75rem" }}
                                    >
                                        {output}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
