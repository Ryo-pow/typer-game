from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WORDS = [
    "print('Hello')",
    "import numpy as np",
    "def main():",
    "return True",
    "class User:",
    "for i in range(10):",
    "if x > 0:",
    "while True:",
    "pip install fastapi",
    "git commit -m 'fix'",
]

@app.get("/words")
def get_words():
    return {"words": WORDS}
