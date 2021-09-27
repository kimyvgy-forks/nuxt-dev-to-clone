REGISTRY_SERVER ?= registry.gitlab.com
REGISTRY_PATH := $(REGISTRY_SERVER)/webee-asia/s

WEB_IMAGE := $(REGISTRY_PATH)/nuxt-dev-to-clone

TAG ?= latest
UNIQUE_TAG ?= $(TAG)

all: build web

build:
	docker build . \
		--target build \
		--tag $(WEB_IMAGE):build \
		--cache-from $(WEB_IMAGE):build

web:
	docker build . \
		--build-arg VERSION=$(UNIQUE_TAG) \
		--tag $(WEB_IMAGE):$(TAG) \
		--cache-from $(WEB_IMAGE):build \
		--cache-from $(WEB_IMAGE):$(TAG)

release:
	docker tag $(WEB_IMAGE):$(TAG) $(WEB_IMAGE):$(UNIQUE_TAG)

	docker push $(WEB_IMAGE):$(UNIQUE_TAG)
	docker push $(WEB_IMAGE):$(TAG)
