import React from 'react';
import TrendingProducts from './TrendingProducts';

const trendingProducts = [
    {
        id: 1,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://i.pinimg.com/236x/18/0f/4c/180f4cc984dfdfb4ce5fc4ea94250029.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
        availableColors: [
            { name: 'Black', colorBg: '#111827' },
            { name: 'Brass', colorBg: '#FDE68A' },
            { name: 'Chrome', colorBg: '#E5E7EB' },
        ],
    },
    {
        id: 2,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://i.pinimg.com/236x/26/4b/68/264b68d884840cf96b21a97563bd0dcf.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
        availableColors: [
            { name: 'Black', colorBg: '#111827' },
            { name: 'Brass', colorBg: '#FDE68A' },
            { name: 'Chrome', colorBg: '#E5E7EB' },
        ],
    },
    {
        id: 3,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://i.pinimg.com/236x/d1/b0/82/d1b08231046d952ba763aedf257f1bde.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
        availableColors: [
            { name: 'Black', colorBg: '#111827' },
            { name: 'Brass', colorBg: '#FDE68A' },
            { name: 'Chrome', colorBg: '#E5E7EB' },
        ],
    },
    {
        id: 4,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://i.pinimg.com/236x/db/87/fc/db87fc3a44402f215f5cbc281d3fe11a.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
        availableColors: [
            { name: 'Black', colorBg: '#111827' },
            { name: 'Brass', colorBg: '#FDE68A' },
            { name: 'Chrome', colorBg: '#E5E7EB' },
        ],
    },

    // More products...
]

export default function IncentivesComp() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-1 sm:px-2 sm:py-7 lg:px-1">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">

                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            We built our business on customer service
                        </h2>
                        <p className="mt-4 text-gray-500">
                            At the beginning at least, but then we realized we could make a lot more money if we kinda stopped caring
                            about that. Our new strategy is to write a bunch of things that look really good in the headlines, then
                            clarify in the small print but hope people don't actually read it.
                        </p>
                    </div>

                    <div className=" sm:py-7 lg:mx-auto lg:max-w-7xl  ">
                        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                            <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                                Lingerie & Nightie
                            </h2>
                            <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                                See everything
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>

                        <div className="relative mt-8">
                            <div className="relative w-full overflow-x-auto">
                                <ul
                                    role="list"
                                    className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                                >
                                    {trendingProducts.map((product) => (
                                        <li key={product.id} className="inline-flex w-64 rounded-0 flex-col text-center lg:w-auto">
                                            <div className="group relative">
                                                <img
                                                    alt={product.imageAlt}
                                                    src={product.imageSrc}
                                                    className=" w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
                                                />
                                                <div className="mt-6">
                                                    {/* <p className="text-sm text-gray-500">{product.color}</p> */}
                                                    <h3 className="mt-1 font-semibold text-gray-900">
                                                        <a href={product.href}>
                                                            <span className="absolute inset-0" />
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                    <p className="mt-1 text-gray-900">{product.price}</p>
                                                </div>
                                            </div>

                                            <h4 className="sr-only">Available colors</h4>
                                            <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
                                                {product.availableColors.map((color) => (
                                                    <li
                                                        key={color.name}
                                                        style={{ backgroundColor: color.colorBg }}
                                                        className="size-4 rounded-full border border-black/10"
                                                    >
                                                        <span className="sr-only">{color.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 px-4 sm:hidden">
                            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                See everything
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
} 