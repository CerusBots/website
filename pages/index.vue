<template>
	<div class="w-full min-w-full max-w-full">
		<div class="hero min-h-[32rem] bg-base-200 px-8">
			<div class="hero-content text-center">
				<div class="min-w-full max-w-full w-full">
					<h1 class="text-5xl font-bold">{{ $i18n.t('hero.title') }}</h1>
					<p class="py-6">{{ $i18n.t('hero.text') }}</p>
					<a href="/pricing" class="btn btn-primary justify-end">{{
						$i18n.t('see-pricing')
					}}</a>
				</div>
			</div>
		</div>
		<div class="justify-center py-8 h-fit">
			<div
				class="grid grid-rows-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-flow-col xl:grid-flow-col gap-4">
				<div v-for="i in 3" :key="i" class="row-auto col-span-4 card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">{{ $i18n.t(`card.${i}.title`) }}</h2>
						<ul>
							<li v-for="x in 3" :key="x" class="py-4">
								<div class="card bg-primary">
									<div class="card-body">
										<h2 class="card-title">
											{{ $i18n.t(`card.${i}.items.${x}.title`) }}
										</h2>
										<p>{{ $i18n.t(`card.${i}.items.${x}.content`) }}</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useI18n } from '@midstallsoftware/vista/dist/runtime/composables/vista'

const $i18n = useI18n()

definePageMeta({
	title: 'page.home',
	layout: 'vs-default',
})
</script>
<i18n>
{
	"en": {
		"hero": {
			"title": "Introducing Cerus",
			"text": "Cerus is the new way to host any Discord bot in the cloud."
		},
		"see-pricing": "See Pricing",
		"card": {
			"1": {
				"title": "Features",
				"items": {
					"1": {
						"title": "CI/CD",
						"content": "With Git service providers such as GitHub and GitLab, you can deploy updates to your bot in seconds automatically."
					},
					"2": {
						"title": "No Coding Needed",
						"content": "Cerus includes the Stratch Blocks developed by MIT so you do not need to be a programmer to make bots."
					},
					"3": {
						"title": "Analytics",
						"content": "Get automated reports such as bot interaction frequency to judge your bot's performance."
					}
				}
			},
			"2": {
				"title": "Services We Use",
				"items": {
					"1": {
						"title": "Pulumi",
						"content": "Pulumi is responsible for ensuring Cerus (and many other things) get put onto the cloud correctly."
					},
					"2": {
						"title": "Auth0",
						"content": "The all-in-one solution for user authentication and management."
					},
					"3": {
						"title": "Stripe",
						"content": "One of the many alternatives to PayPal, Stripe handles everyone's payments on Cerus and many other services."
					}
				}
			},
			"3": {
				"title": "FOSS Friendly",
				"items": {
					"1": {
						"title": "Self-Hostable",
						"content": "Cerus has been developed to allow anyone to deploy it on their own Kubernetes cluster. In a matter of minutes, you could be running just the bot runner to even the dashboard."
					},
					"2": {
						"title": "Fully Open Source",
						"content": "We developed Cerus and ensured its entire source code is available for everyone."
					},
					"3": {
						"title": "Linux Friendly",
						"content": "Cerus is developed and maintained on Linux machines, this ensures we use the best tools for the right job when developing Cerus."
					}
				}
			}
		}
	}
}
</i18n>
