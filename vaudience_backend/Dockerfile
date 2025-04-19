# Берем за основу slim версию питона 3.12
FROM python:3.12-slim AS build

# Устанавливаем рабочую папку, название может быть любое
WORKDIR /app

# Устанавлием poetry
RUN pip install poetry

# Копируем poetry.toml и poetry.lock в контейнер
COPY pyproject.toml poetry.lock ./

# Настроим poetry чтобы не создавать виртуальное окружение
RUN poetry config virtualenvs.create false

# Устанавливаем зависимости
RUN poetry install --no-interaction --no-root

# Копируем весь проект в контейнер
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]