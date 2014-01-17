from setuptools import setup, find_packages
# Taken from django's setup.py:

import os

packages, package_data = [], {}

def is_package(package_name):
    return True

def fullsplit(path, result=None):
    """
Split a pathname into components (the opposite of os.path.join)
in a platform-neutral way.
"""
    if result is None:
        result = []
    head, tail = os.path.split(path)
    if head == '':
        return [tail] + result
    if head == path:
        return result
    return fullsplit(head, [tail] + result)



for dirpath, dirnames, filenames in os.walk("authz_group"):
    # Ignore PEP 3147 cache dirs and those whose names start with '.'
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != '__pycache__']
    parts = fullsplit(dirpath)
    package_name = '.'.join(parts)
    if '__init__.py' in filenames and is_package(package_name):
        packages.append(package_name)
    elif filenames:
        relative_path = []
        while '.'.join(parts) not in packages:
            relative_path.append(parts.pop())
        relative_path.reverse()
        path = os.path.join(*relative_path)
        package_files = package_data.setdefault('.'.join(parts), [])
        package_files.extend([os.path.join(path, f) for f in filenames])

setup(
    name='AuthZ-Group',
    version='1.1.2',
    description='Group interface and implementations',
    packages = find_packages(),
    install_requires=['Django'],
    package_data = package_data,
    author = "Patrick Michaud",
    author_email = "pmichaud@uw.edu",
    license = "Apache 2.0",
    keywords = "django groups authorization",
    url = "https://github.com/vegitron/authz_group/"
)
