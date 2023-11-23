# Copyright rigélblu inc.
# All rights reserved.

# syntax=docker/dockerfile:1

# ----------
# Stage: Deps Builder
FROM python:3.10-slim as deps-builder

ENV PYTHONUNBUFFERED=True
ENV PYTHONUSERBASE=/deps

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip3 install --user --no-cache-dir -r requirements.txt

# TODO:enable steps once we have unit tests
# COPY jest.config.js ./
# RUN yarn test

# ----------
# Stage: Runner
FROM python:3.10-slim as runner

ENV PYTHONUNBUFFERED=True
ENV PYTHONUSERBASE=/deps
ENV PYTHONPATH=${PYTHONUSERBASE}/lib/python3.10/site-packages
ENV PATH=${PYTHONUSERBASE}/bin:${PATH}

WORKDIR /usr/src/app
RUN adduser --disabled-password app && chown -R app ./
USER app

COPY --from=deps-builder /deps /deps
COPY . .

EXPOSE 8080
CMD exec uvicorn --host 0.0.0.0 --port 8080 src.main:app
