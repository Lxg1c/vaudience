class RBProduct:
    def __init__(self, product_id: int | None = None,
                 category_id: int | None = None):
        self.id = product_id
        self.category_id = category_id

    def to_dict(self) -> dict:
        return {key: value for key, value in {
            'id': self.id,
            'category_id': self.category_id
        }.items() if value is not None}