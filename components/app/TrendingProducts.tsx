import React from 'react'

export default function TrendingProducts() {
    const trendingProducts = [
        {
            id: 1,
            name: 'Machined Pen',
            color: 'Black',
            price: '$35',
            href: '#',
            imageSrc: 'https://i.pinimg.com/474x/4d/95/22/4d952298b289ee919d3431c2db2e36b2.jpg',
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
            imageSrc: 'https://i.pinimg.com/236x/7e/ab/e6/7eabe639d08df4d7514886e3c60ba4d9.jpg',
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
            imageSrc: 'https://i.pinimg.com/236x/ae/76/66/ae76660054666666a8b046fc7d32cb51.jpg',
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
            imageSrc: 'https://i.pinimg.com/236x/df/c2/3c/dfc23c5c3a0840a3a8d2e21140eba1aa.jpg',
            imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
            availableColors: [
                { name: 'Black', colorBg: '#111827' },
                { name: 'Brass', colorBg: '#FDE68A' },
                { name: 'Chrome', colorBg: '#E5E7EB' },
            ],
        },

        // More products...
    ]
    return (

        <section aria-labelledby="trending-heading" className="bg-white">
            <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-7">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                    <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Trending products
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
        </section>
    )
}