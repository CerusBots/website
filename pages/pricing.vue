<template>
	<div class="w-full min-w-full max-w-full">
		<div class="justify-center py-8 h-fit">
			<div class="grid grid-rows-1 sm:grid-cols-1 md:grid-cols-1 gap-48">
				<div class="row-auto col-span-12 card bg-base-200 max-w-fit text-center">
					<div class="card">
						<div class="card-body">
							<h2 class="card-title">{{ $i18n.t('page.pricing') }}</h2>
						</div>
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
	title: 'page.pricing',
	layout: 'vs-default',
})
</script>
