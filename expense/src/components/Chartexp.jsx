import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

Chart.register(ArcElement);

const Chartexp = () => {

    const config = {
        data: {
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4,
                borderRadius: 10,
                spacing: 2
            }]

        },
        options: {
            cutout: 115
        }
    }

    const labelObjects = [
        {
            type: 'Savings',
            color: 'rgb(255, 99, 132)',
            percent: 25
        },

        {
            type: 'Income',
            color: 'rgb(54, 162, 235)',
            percent: 50
        },

        {
            type: 'Expenditure',
            color: 'rgb(255, 205, 86)',
            percent: 25
        },
    ]


    return (
        <div className='felx justify-content max-w-xs mx-auto'>
            <div className='item items-center text-center'>
                <div className='chart relative'>
                    <Doughnut {...config}></Doughnut>
                    <h3 className='mb-4 font-bold title'>Total
                        <span className='block text-2xl text-emerald-400'>Rs.{0}</span>
                    </h3>
                </div>

                {labelObjects.map((value, index) => {
                    return (
                        <>
                            <div key={index} style={{ background: value.color ?? '#f9c76f' }} className='flex mt-4 flex-col py-4 gap-2 rounded text-center justify-center'>
                                <div className='labels flex justify-between'>
                                    <div className='flex flex-col gap-2'>
                                            <h3 className='w-4 text-md ml-2'>{value.type}</h3>                                        
                                    </div>
                                    <h3 className='font-bold mr-2'>{value.percent}</h3>
                                </div>
                            </div>

                        </>
                    )
                })}

            </div>
        </div>
    )
}

export default Chartexp