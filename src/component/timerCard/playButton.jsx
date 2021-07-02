import React from "react"

function PlayButton(props) {
    const { isPlaying = false, onChange = () => {} } = props

    return (
        <div
            test="playButton"
            className="cursor-pointer"
            onClick={() => {
                onChange(!isPlaying)
            }}
        >
            {isPlaying ? (
                <svg
                    style={{ fill: "#007bff" }}
                    className="h-8 w-auto"
                    height="512"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 477.867 477.867"
                >
                    <g>
                        <g>
                            <path
                                d="M187.733,0H51.2c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C204.8,7.641,197.159,0,187.733,0z M170.667,443.733h-102.4v-409.6h102.4V443.733z"
                            />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M426.667,0H290.133c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C443.733,7.641,436.092,0,426.667,0z M409.6,443.733H307.2v-409.6h102.4V443.733z"
                            />
                        </g>
                    </g>
                </svg>
            ) : (
                <svg
                    style={{ fill: "#007bff" }}
                    className="h-8 w-auto"
                    height="512"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 477.886 477.886"
                >
                    <g>
                        <g>
                            <path
                                d="M476.091,231.332c-1.654-3.318-4.343-6.008-7.662-7.662L24.695,1.804C16.264-2.41,6.013,1.01,1.8,9.442
			c-1.185,2.371-1.801,4.986-1.8,7.637v443.733c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8
			L468.429,254.22C476.865,250.015,480.295,239.768,476.091,231.332z M34.133,433.198V44.692l388.506,194.253L34.133,433.198z"
                            />
                        </g>
                    </g>
                </svg>
            )}
        </div>
    )
}

export default PlayButton
export { PlayButton }
