import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

function HomeCarousel() {
	return (
		<Container>
			<Carousel className='home-carousel' >
				<Carousel.Item>
					<img
						className='d-block w-100'
						src="https://serviciohoy.com/wp-content/uploads/2021/07/mantemineto-2048x1363.jpg"
						alt="Electricidad"
					/>
					<Carousel.Caption>
						<h5>Electricidad</h5>
						<p>La electricidad es un servicio esencial que proporciona energía eléctrica a hogares, empresas e industrias. Esta energía se utiliza para alimentar una amplia variedad de dispositivos y equipos eléctricos, como luces, electrodomésticos, ordenadores, maquinarias y sistemas de transporte..</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						src="https://serviciohoy.com/wp-content/uploads/2021/07/1411109-foto-1-1.png"
						alt="Gasista"
					/>
					<Carousel.Caption>
						<h5>Gasista</h5>
						<p>
							El servicio de gasista es un tipo de servicio de plomería especializado en la instalación, mantenimiento y reparación de sistemas de gas residenciales, comerciales e industriales. Los gasistas están capacitados para trabajar con tuberías de gas, calderas, calefones, estufas, hornos y otros dispositivos que utilicen gas natural o propano como combustible.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						src="https://serviciohoy.com/wp-content/uploads/2021/09/aire4.jpg"
						alt="Aire Acondicionado"
					/>
					<Carousel.Caption>
						<h5>Aire Acondicionado</h5>
						<p>
							El servicio de aire acondicionado y refrigeración se refiere a la instalación, mantenimiento y reparación de sistemas de climatización y enfriamiento. Los sistemas de aire acondicionado y refrigeración se utilizan para controlar la temperatura y la humedad en edificios residenciales y comerciales, así como en instalaciones industriales.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</Container>
	);
}

export default HomeCarousel;