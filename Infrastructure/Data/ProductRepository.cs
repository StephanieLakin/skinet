using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
               .Include(p => p.ProductType)
               .Include(p => p.ProductBrand)
               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
             //var typeId = 1;

             //var products = _context.Products
             //   .Where(x => x.ProductTypeId == typeId)
             //   .Include(x => x.ProductTypeId).ToListAsync();


            return await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)
                .ToListAsync();
        }
        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        async Task<IReadOnlyList<ProductBrand>> IProductRepository.GetProductBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }
    }
}