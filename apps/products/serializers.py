from rest_framework import serializers
from .models import Category, Collection, Color, Product, ProductImage, ProductVariant



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id", "name", "slug", "description"]


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name", "hex_code"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "is_main", "order"]    

class ProductVariantSerializer(serializers.ModelSerializer):
    color = ColorSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = ["id", "color", "size", "stock"]
    

class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    main_image = serializers.SerializerMethodField()
    colors = serializers.SerializerMethodField()
    in_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "price", "category",
                  "is_bestseller", "main_image", "colors", "in_stock"]

    def get_main_image(self, obj):
        images = list(obj.images.all())
        main = next((i for i in images if i.is_main), images[0] if images else None)
        if main is None:
            return None
        request = self.context.get("request")
        url = main.image.url
        return request.build_absolute_uri(url) if request else url

    def get_colors(self, obj):
        seen = {}
        for v in obj.variants.all():
            seen[v.color_id] = v.color
        return ColorSerializer(seen.values(), many=True).data

    def get_in_stock(self, obj):
        return any(v.stock > 0 for v in obj.variants.all())


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    collection = CollectionSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    colors = serializers.SerializerMethodField()
    related_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "price", "category",
                  "collection", "is_bestseller", "images", "variants",
                  "colors", "related_products"]

    def get_colors(self, obj):
        seen = {}
        for v in obj.variants.all():
            seen[v.color_id] = v.color
        return ColorSerializer(seen.values(), many=True).data

    def get_related_products(self, obj):
        related = obj.related_products.filter(is_active=True)
        return ProductListSerializer(related, many=True, context=self.context).data