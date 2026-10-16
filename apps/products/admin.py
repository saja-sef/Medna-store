from django.contrib import admin
from .models import Category, Collection, Color, Product, ProductImage, ProductVariant


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ("name", "hex_code")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "is_bestseller", "is_active")
    list_filter = ("category", "collection", "is_bestseller", "is_active")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("related_products",)
    inlines = [ProductImageInline, ProductVariantInline]