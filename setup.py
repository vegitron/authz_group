from setuptools import setup, find_packages

setup(
    name='AuthZ-Group',
    version='1.1',
    description='Group interface and implementations',
    packages = find_packages(),
    install_requires=['Django'],
    author = "Patrick Michaud",
    author_email = "pmichaud@uw.edu",
    license = "Apache 2.0",
    keywords = "django groups authorization",
    url = "https://github.com/vegitron/authz_group/"
)
