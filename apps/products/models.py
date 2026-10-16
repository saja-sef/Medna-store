from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, help_text="Example: #1F3A5F")

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")
    is_bestseller = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    related_products = models.ManyToManyField("self", blank=True, symmetrical=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")
    is_main = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.product.name} image {self.order}"


class ProductVariant(models.Model):
    SIZES = [("XS", "XS"), ("S", "S"), ("M", "M"), ("L", "L"),
             ("XL", "XL"), ("XXL", "XXL")]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    color = models.ForeignKey(Color, on_delete=models.PROTECT)
    size = models.CharField(max_length=5, choices=SIZES, blank=True, default="")
    stock = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("product", "color", "size")

    def __str__(self):
        return f"{self.product.name} / {self.color.name} / {self.size}"