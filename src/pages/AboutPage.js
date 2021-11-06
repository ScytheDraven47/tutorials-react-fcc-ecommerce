import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
	return (
		<main>
			<PageHero title={'about'} />
			<Wrapper className='page section section-center'>
				<img src={aboutImg} alt='nice desk' />
				<article>
					<div className='title'>
						<h2>our story</h2>
						<div className='underline'></div>
					</div>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Rem officia nihil fuga recusandae porro neque.
					</p>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Officiis quas laboriosam impedit eveniet dolores.
						Consequuntur ad velit deserunt totam quas assumenda a
						facere, perferendis sint quidem veniam, consectetur
						corporis praesentium quam commodi tempora deleniti
						quibusdam officia non nemo molestiae asperiores ullam
						delectus. Ratione, expedita rem animi molestias
						consequuntur magni commodi!
					</p>
				</article>
			</Wrapper>
		</main>
	)
}

const Wrapper = styled.section`
	display: grid;
	gap: 4rem;
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		height: 500px;
		object-fit: cover;
	}
	p {
		line-height: 2;
		max-width: 45em;
		margin: 0 auto;
		margin-top: 2rem;
		color: var(--clr-grey-5);
	}
	.title {
		text-align: left;
	}
	.underline {
		margin-left: 0;
	}
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
`
export default AboutPage
