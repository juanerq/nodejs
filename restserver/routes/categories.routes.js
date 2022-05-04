const router = require('express').Router()
const { createCategory, 
        getCategories, 
        getCategoryById, 
        updateCategory, 
        deleteCategory 
      } = require('../controllers/category.controller')

const { validateReqGet, 
        validateCreateCategory,
        validateGetCategoryById,
        validateUpdateCategory,
        validateDeleteCategory
      } = require('../validators/category')

router.route('/')
  .get( validateReqGet, getCategories )
  .post( validateCreateCategory, createCategory )

router.route('/:id')
  .get( validateGetCategoryById, getCategoryById )
  .put( validateUpdateCategory, updateCategory )
  .delete( validateDeleteCategory, deleteCategory )

module.exports = router